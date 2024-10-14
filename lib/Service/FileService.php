<?php

namespace OCA\OpenCatalogi\Service;

use DateTime;
use Exception;
use Mpdf\Mpdf;
use Mpdf\MpdfException;
use OCP\Files\File;
use OCP\Files\GenericFileException;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IUserSession;
use OCP\Lock\LockedException;
use OCP\Share\IManager;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Loader\FilesystemLoader;
use ZipArchive;

/**
 * Service class for handling file operations in OpenCatalogi
 */
class FileService
{
	/**
	 * Constructor for FileService
	 *
	 * @param IUserSession $userSession The user session
	 * @param LoggerInterface $logger The logger interface
	 * @param IRootFolder $rootFolder The root folder interface
	 * @param IManager $shareManager The share manager interface
	 */
	public function __construct(
		private readonly IUserSession $userSession,
		private readonly LoggerInterface $logger,
		private readonly IRootFolder $rootFolder,
		private readonly IManager $shareManager
	) {}

	/**
	 * Get the name for the folder used for storing files of the given publication.
	 *
	 * @param string $publicationId The id of the Publication.
	 * @param string $publicationTitle The title of the Publication.
	 *
	 * @return string The name the folder for this publication should have.
	 */
	public function getPublicationFolderName(string $publicationId, string $publicationTitle): string
	{
		return "($publicationId) $publicationTitle";
	}

	/**
	 * Gets and returns the current host / domain with correct protocol.
	 *
	 * @return string The current http/https domain url.
	 */
	private function getCurrentDomain(): string
	{
		// Check if the request is over HTTPS
		$isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
		$protocol = $isHttps ? 'https://' : 'http://';

		// Get the host (domain)
		$host = $_SERVER['HTTP_HOST'];

		// Construct the full URL
		return $protocol . $host;
	}

	/**
	 * Returns a share link for the given IShare object.
	 *
	 * @param IShare $share An IShare object we are getting the share link for.
	 *
	 * @return string The share link needed to get the file or folder for the given IShare object.
	 */
	public function getShareLink(IShare $share): string
	{
		return $this->getCurrentDomain() . '/index.php/s/' . $share->getToken();
	}

	/**
	 * Try to find a IShare object with given $path & $shareType.
	 *
	 * @param string $path The path to a file we are trying to find a IShare object for.
	 * @param int|null $shareType The shareType of the share we are trying to find.
	 *
	 * @return IShare|null An IShare object or null.
	 */
	public function findShare(string $path, ?int $shareType = 3): ?IShare
	{
		$path = trim(string: $path, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userId = $currentUser ? $currentUser->getUID() : 'Guest';
		try {
			$userFolder = $this->rootFolder->getUserFolder(userId: $userId);
		} catch(NotPermittedException) {
			$this->logger->error("Can't find share for $path because user (folder) for user $userId couldn't be found");

			return null;
		}

		try {
			// Note: if we ever want to find shares for folders instead of files, this should work for folders as well?
			$file = $userFolder->get(path: $path);
		} catch(NotFoundException $e) {
			$this->logger->error("Can't find share for $path because file doesn't exist");

			return null;
		}

		if ($file instanceof File) {
			$shares = $this->shareManager->getSharesBy(userId: $userId, shareType: $shareType, path: $file);
			if (count($shares) > 0) {
				return $shares[0];
			}
		}

		return null;
	}

	/**
	 * Creates and returns a share link for a file (or folder).
	 * (https://docs.nextcloud.com/server/latest/developer_manual/client_apis/OCS/ocs-share-api.html#create-a-new-share)
	 *
	 * @param string $path Path (from root) to the file/folder which should be shared.
	 * @param int|null $shareType 0 = user; 1 = group; 3 = public link; 4 = email; 6 = federated cloud share; 7 = circle; 10 = Talk conversation
	 * @param int|null $permissions 1 = read; 2 = update; 4 = create; 8 = delete; 16 = share; 31 = all (default: 31, for public shares: 1)
	 *
	 * @return string The share link.
	 * @throws Exception In case creating the share(link) fails.
	 */
	public function createShareLink(string $path, ?int $shareType = 3, ?int $permissions = null): string
	{
		if ($permissions === null) {
			$permissions = 31;
			if ($shareType === 3) {
				$permissions = 1;
			}
		}

		$path = trim(string: $path, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userId = $currentUser ? $currentUser->getUID() : 'Guest';
		try {
			$userFolder = $this->rootFolder->getUserFolder(userId: $userId);
		} catch(NotPermittedException) {
			$this->logger->error("Can't create share link for $path because user (folder) for user $userId couldn't be found");

			return "User (folder) couldn't be found";
		}

		try {
			// Note: if we ever want to create share links for folders instead of files, just remove this try catch and only use setTarget, not setNodeId.
			$file = $userFolder->get(path: $path);
		} catch(NotFoundException $e) {
			$this->logger->error("Can't create share link for $path because file doesn't exist");

			return 'File not found at '.$path;
		}

		// Create a new share
		$share = $this->shareManager->newShare();
		$share->setTarget(target: "/$path");
		$share->setNodeId(fileId: $file->getId());
		$share->setNodeType(type: 'file');
		$share->setShareType(shareType: $shareType);
		if ($permissions !== null) {
			$share->setPermissions(permissions: $permissions);
		}
		$share->setSharedBy(sharedBy: $userId);
		$share->setShareOwner(shareOwner: $userId);
		$share->setShareTime(shareTime: new DateTime());
		$share->setStatus(status: $share::STATUS_ACCEPTED);

		try
		{
			$share = $this->shareManager->createShare(share: $share);
			return $this->getShareLink($share);
		} catch (Exception $exception) {
			$this->logger->error("Can't create share link for $path: " . $exception->getMessage());

			throw new Exception('Can\'t create share link');
		}
	}

	/**
	 * Uploads a file to NextCloud. Will create a new file if it doesn't exist yet.
	 *
	 * @param mixed $content The content of the file.
	 * @param string $filePath Path (from root) where to save the file. NOTE: this should include the name and extension/format of the file as well! (example.pdf)
	 *
	 * @return bool True if successful.
	 * @throws Exception In case we can't write to file because it is not permitted.
	 */
	public function uploadFile(mixed $content, string $filePath): bool
	{
		$filePath = trim(string: $filePath, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userFolder = $this->rootFolder->getUserFolder(userId: $currentUser ? $currentUser->getUID() : 'Guest');

		// Check if file exists and create it if not.
		try {
			try {
				$userFolder->get(path: $filePath);
			} catch(NotFoundException $e) {
				$userFolder->newFile(path: $filePath);
				$file = $userFolder->get(path: $filePath);

				$file->putContent(data: $content);

				return true;
			}

			// File already exists.
			$this->logger->warning("File $filePath already exists.");
			return false;

		} catch(NotPermittedException|GenericFileException|LockedException $e) {
			$this->logger->error("Can't create file $filePath: " . $e->getMessage());

			throw new Exception("Can't write to file $filePath");
		}
	}

	/**
	 * Overwrites an existing file in NextCloud.
	 *
	 * @param mixed $content The content of the file.
	 * @param string $filePath Path (from root) where to save the file. NOTE: this should include the name and extension/format of the file as well! (example.pdf)
	 * @param bool $createNew Default = false. If set to true this function will create a new file if it doesn't exist yet.
	 *
	 * @return bool True if successful.
	 * @throws Exception In case we can't write to file because it is not permitted.
	 */
	public function updateFile(mixed $content, string $filePath, bool $createNew = false): bool
	{
		$filePath = trim(string: $filePath, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userFolder = $this->rootFolder->getUserFolder(userId: $currentUser ? $currentUser->getUID() : 'Guest');

		// Check if file exists and overwrite it if it does.
		try {
			try {
				$file = $userFolder->get(path: $filePath);

				$file->putContent(data: $content);

				return true;
			} catch(NotFoundException $e) {
				if ($createNew === true) {
					$userFolder->newFile(path: $filePath);
					$file = $userFolder->get(path: $filePath);

					$file->putContent(data: $content);

					$this->logger->info("File $filePath did not exist, created a new file for it.");
					return true;
				}
			}

			// File already exists.
			$this->logger->warning("File $filePath already exists.");
			return false;

		} catch(NotPermittedException|GenericFileException|LockedException $e) {
			$this->logger->error("Can't create file $filePath: " . $e->getMessage());

			throw new Exception("Can't write to file $filePath");
		}
	}

	/**
	 * Deletes a file from NextCloud.
	 *
	 * @param string $filePath Path (from root) to the file you want to delete.
	 *
	 * @return bool True if successful.
	 * @throws Exception In case deleting the file is not permitted.
	 */
	public function deleteFile(string $filePath): bool
	{
		$filePath = trim(string: $filePath, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userFolder = $this->rootFolder->getUserFolder(userId: $currentUser ? $currentUser->getUID() : 'Guest');

		// Check if file exists and delete it if it does.
		try {
			try {
				$file = $userFolder->get(path: $filePath);
				$file->delete();

				return true;
			} catch(NotFoundException $e) {
				// File does not exist.
				$this->logger->warning("File $filePath does not exist.");

				return false;
			}
		} catch(NotPermittedException|InvalidPathException $e) {
			$this->logger->error("Can't delete file $filePath: " . $e->getMessage());

			throw new Exception("Can't delete file $filePath");
		}
	}

	/**
	 * Creates a new folder in NextCloud, unless it already exists.
	 *
	 * @param string $folderPath Path (from root) to where you want to create a folder, include the name of the folder. (/Media/exampleFolder)
	 *
	 * @return bool True if successfully created a new folder.
	 * @throws Exception In case we can't create the folder because it is not permitted.
	 */
	public function createFolder(string $folderPath): bool
	{
		$folderPath = trim(string: $folderPath, characters: '/');

		// Get the current user.
		$currentUser = $this->userSession->getUser();
		$userFolder = $this->rootFolder->getUserFolder(userId: $currentUser ? $currentUser->getUID() : 'Guest');

		// Check if folder exists and if not create it.
		try {
			try {
				$userFolder->get(path: $folderPath);
			} catch(NotFoundException $e) {
				$userFolder->newFolder(path: $folderPath);

				return true;
			}

			// Folder already exists.
			$this->logger->info("This folder already exits $folderPath");
			return false;

		} catch(NotPermittedException $e) {
			$this->logger->error("Can't create folder $folderPath: " . $e->getMessage());

			throw new Exception("Can\'t create folder $folderPath");
		}
	}

	/**
	 * Creates a pdf file in a /tmp folder using a twig template and given context.
	 *
	 * @param string $twigTemplate The path and filename of the twig template to use in the folder "lib/Templates".
	 * @param array $context The context to pass along while rendering the pdf with the given twig template.
	 *
	 * @return Mpdf A Mpdf object.
	 * Use "$mpdf->Output(name: $filename, dest: Destination::FILE)" to create the actual file or use one of the other Destination::X options.
	 * Please use the "rmdir(directory: '/tmp/mpdf');" function after this to clean up temporary files.
	 * @throws MpdfException|LoaderError|RuntimeError|SyntaxError
	 */
	public function createPdf(string $twigTemplate, array $context): Mpdf
	{
		// Initialize Twig
		$loader = new FilesystemLoader(paths: 'lib/Templates', rootPath: __DIR__ . '/../../');
		$twig = new Environment($loader);

		// Render the Twig template
		$html = $twig->render(name: $twigTemplate, context: $context);

		// Check if the directory exists, if not, create it
		if (file_exists(filename: '/tmp/mpdf') === false) {
			mkdir(directory: '/tmp/mpdf', recursive: true);
		}

		// Set permissions for the directory (ensure it's writable)
		chmod(filename: '/tmp/mpdf', permissions: 0777);

		// Initialize mPDF
		$mpdf = new Mpdf(config: ['tempDir' => '/tmp/mpdf']);

		// Write HTML to PDF
		$mpdf->WriteHTML(html: $html);

		return $mpdf;
	}


	/**
	 * Creates a ZIP archive at the $tempZip location using the $tempFolder location as input for the ZIP archive.
	 * Please use "unlink(filename: $tempZip);" or the downloadZip() function after calling this function to clean up temporary files.
	 *
	 * @param string $inputFolder The (tmp) location used as input for creating the ZIP archive.
	 * @param string $tempZip The tmp location where the ZIP will be saved. Please start this with '/tmp/..' and end with '../zipName.zip'.
	 *
	 * @return string|null Returns null if created successfully and a string in case of an error.
	 */
	public function createZip(string $inputFolder, string $tempZip): ?string
	{
		// Create ZIP archive.
		$zip = new ZipArchive();
		if ($zip->open(filename: $tempZip, flags: ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
			$files = new RecursiveIteratorIterator(
				iterator: new RecursiveDirectoryIterator($inputFolder),
				mode: RecursiveIteratorIterator::LEAVES_ONLY
			);

			foreach ($files as $name => $file) {
				// Skip directories (they would be added automatically)
				if ($file->isDir() === false) {
					$filePath = $file->getRealPath();
					$relativePath = substr(string: $filePath, offset: strlen(string: $inputFolder) + 1);

					// Add file to zip
					$zip->addFile(filepath: $filePath, entryname: $relativePath);
				}
			}
			$zip->close();
		} else {
			return "failed to create ZIP archive";
		}

		return null;
	}


	/**
	 * A function that outputs a downloadable ZIP to the response body of the current api request.
	 * Can best be used after creating a ZIP archive with the createZip() function.
	 *
	 * @param string $tempZip The tmp location where the ZIP is saved.
	 * Note that "unlink(filename: $tempZip);" will be called at the end of this function.
	 * @param string|null $inputFolder The tmp location used as input for creating the ZIP archive.
	 * Will unlink all files in this folder and remove this folder at the end of this function.
	 *
	 * @return void
	 */
	public function downloadZip(string $tempZip, ?string $inputFolder = null): void
	{
		// Send the ZIP file to the client for download.
		header(header: 'Content-Type: application/zip');
		header(header: 'Content-disposition: attachment; filename=' . basename($tempZip));
		header(header: 'Content-Length: ' . filesize($tempZip));
		readfile(filename: $tempZip);

		// Cleanup temporary files.
		if ($inputFolder !== null) {
			array_map(callback: 'unlink', array: glob(pattern: "$inputFolder/*.*"));
			rmdir(directory: $inputFolder);
		}
		unlink(filename: $tempZip);
	}

}
