<?php

namespace OCA\OpenCatalogi\Controller;

use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Mpdf\MpdfException;
use Mpdf\Output\Destination;
use OCA\OpenCatalogi\Db\AttachmentMapper;
use OCA\opencatalogi\lib\Db\Publication;
use OCA\OpenCatalogi\Db\PublicationMapper;
use OCA\OpenCatalogi\Service\ElasticSearchService;
use OCA\OpenCatalogi\Service\FileService;
use OCA\OpenCatalogi\Service\DownloadService;
use OCA\OpenCatalogi\Service\ObjectService;
use OCA\OpenCatalogi\Service\SearchService;
use OCA\OpenCatalogi\Service\ValidationService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\IAppConfig;
use OCP\IRequest;
use Symfony\Component\Uid\Uuid;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class PublicationsController extends Controller
{


    public function __construct
	(
		$appName,
		IRequest $request,
		private readonly PublicationMapper $publicationMapper,
		private readonly AttachmentMapper $attachmentMapper,
		private readonly IAppConfig $config,
		private readonly FileService $fileService,
		private readonly DownloadService $downloadService,
		private ObjectService $objectService
	)
    {
        parent::__construct($appName, $request);
    }

	private function insertNestedObjects(array $object, ObjectService $objectService, array $config): array
	{
		//@TODO keep in mind that unpublished objects should not be inserted, and that objects should be updated if a subobject is updated.
		foreach ($object as $key => $value) {
			try {
				if (
					is_string(value: $value)
					&& $key !== 'id'
					&& Uuid::isValid(uuid: $value) === true
					&& $subObject = $objectService->findObject(filters: ['_id' => $value], config: $config)
				) {
					$object[$key] = $subObject;
				}

				if (
					is_array(value: $value) === true
					&& array_is_list(array: $value) === true
				) {
					$object[$key] = $this->insertNestedObjects(object: $value, objectService: $objectService, config: $config);
				}
			} catch (GuzzleException $exception) {
				continue;
			}
		}

		return $object;
	}


	/**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function page(?string $getParameter)
    {
        // The TemplateResponse loads the 'main.php'
        // defined in our app's 'templates' folder.
        // We pass the $getParameter variable to the template
        // so that the value is accessible in the template.
        return new TemplateResponse(
            $this->appName,
            'PublicationsIndex',
            []
        );
    }

    /**
     * Taking it from a catalogue point of view is just adding a filter
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function catalog(string|int $id): TemplateResponse
	{
		// The TemplateResponse loads the 'main.php'
		// defined in our app's 'templates' folder.
		// We pass the $getParameter variable to the template
		// so that the value is accessible in the template.
		return new TemplateResponse(
			$this->appName,
			'PublicationsIndex',
			[]
		);
	}

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function index(ObjectService $objectService, SearchService $searchService): JSONResponse
    {
        $filters = $this->request->getParams();
		$limit = $this->request->getParam('limit', null);
		$offset = $this->request->getParam('offset', null);
		$order = $this->request->getParam('order', []);
		unset($filters['_route']); //@todo why is this here?
		unset($filters['_extend']);
		unset($filters['_limit']);
		unset($filters['_offset']);
		unset($filters['_order']);

		$objects = $this->objectService->getObjects('publication', null, null, $filters, null, null, $order);

		$data = [
			'results' => $objects,
			'total' => count($objects)
		];
		return new JSONResponse($data);
    }


    /**
	 * 
     */
    public function show(string|int $id, ObjectService $objectService): JSONResponse
    {
		$object = $this->objectService->getObject('publication', $publicationId);
		return new JSONResponse($object);
    }

	/**
	 * Return all attachments for given publication.
	 *
	 * @param string|int $id The id.
	 * @param ObjectService $objectService The Object Service.
	 * @param array|null $publication A publication array.
	 *
	 * @return JSONResponse The Response.
	 * @throws GuzzleException
	 */
	private function publicationsAttachments(string|int $id, ObjectService $objectService, ?array $publication = null): JSONResponse
	{
		$filters = $this->request->getParams();
		$filter['publication'] = $id;
		$limit = $this->request->getParam('limit', null);
		$offset = $this->request->getParam('offset', null);
		$order = $this->request->getParam('order', []);
		unset($filters['_route']); //@todo why is this here?
		unset($filters['_extend']);
		unset($filters['_limit']);
		unset($filters['_offset']);
		unset($filters['_order']);

		$objects = $this->objectService->getObjects('attachment', null, null, $filters, null, null, $order);

		$data = [
			'results' => $objects,
			'total' => count($objects)
		];
		return new JSONResponse($data);
	}


	/**
	 * Create/updates a file containing all metadata of a publication to NextCloud files, finds/creates a share link and returns it.
	 *
	 * @param string $filename The (tmp) filename of the file to store in NextCloud files.
	 * @param array $publication The publication data used to find/create the publication specific folder in NextCloud files.
	 *
	 * @return string|JSONResponse A share link url or an error JSONResponse.
	 * @throws Exception When a function reading or writing to NextCloud files goes wrong.
	 */
	private function saveFileToNextCloud(string $filename, array $publication): string|JSONResponse
	{
		// Create the Publicaties folder and the Publication specific folder.
		$this->fileService->createFolder(folderPath: 'Publicaties');
		$publicationFolder = $this->fileService->getPublicationFolderName(
			publicationId: $publication['id'],
			publicationTitle: $publication['title']
		);
		$this->fileService->createFolder(folderPath: "Publicaties/$publicationFolder");

		// Save the file to NextCloud.
		$filePath = "Publicaties/$publicationFolder/$filename";
		$created = $this->fileService->updateFile(
			content: file_get_contents(filename: $filename),
			filePath: $filePath,
			createNew: true
		);

		if ($created === false) {
			return new JSONResponse(data: ['error' => "Failed to upload this file: $filePath to NextCloud"], statusCode: 500);
		}

		// Create ShareLink
		$share = $this->fileService->findShare(path: $filePath);
		if ($share !== null) {
			$shareLink = $this->fileService->getShareLink($share);
		} else {
			$shareLink = $this->fileService->createShareLink(path: $filePath);
		}

		return $shareLink;
	}


	/**
	 * Download a publication in either PDF or ZIP format.
	 *
	 * This method handles the download request for a publication, supporting both PDF and ZIP formats.
	 * The format is determined by the 'Accept' header in the request.
	 *
	 * @param string|int $id The ID of the publication to download.
	 * @param ObjectService $objectService The service to handle object operations.
	 * @return JSONResponse The response containing either the file download or an error message.
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function download(string|int $id, ObjectService $objectService): JSONResponse
	{
		// Determine the requested format based on the 'Accept' header
		return match ($this->request->getHeader('Accept')) {
			// If PDF is requested, create and return a PDF file
			'application/pdf' => $this->downloadService->createPublicationFile(objectService: $objectService, id: $id),
			// If ZIP is requested, create and return a ZIP file
			'application/zip' => $this->downloadService->createPublicationZip(objectService: $objectService, id: $id),
			// If an unsupported format is requested, return an error response
			default => new JSONResponse(
				data: ['error' => 'Unsupported Accept header, please use [application/pdf] or [application/zip]'],
				statusCode: 400
			),
		};
	}

    /**
     * Create a new publication.
     *
     * @param ObjectService $objectService The service to handle object operations.
     * @return JSONResponse The response containing the created publication object.
     */
    public function create(ObjectService $objectService): JSONResponse
    {
        // Get all parameters from the request
        $data = $this->request->getParams();
        
        // Remove the 'id' field if it exists, as we're creating a new object
        unset($data['id']);

        // Save the new publication object
        $object = $this->objectService->saveObject('publication', $data);
        
        // Return the created object as a JSON response
        return new JSONResponse($object);
    }

    /**
     * Update an existing publication.
     *
     * @param string|int $id The ID of the publication to update.
     * @param ObjectService $objectService The service to handle object operations.
     * @return JSONResponse The response containing the updated publication object.
     */
    public function update(string|int $id, ObjectService $objectService): JSONResponse
    {
        // Get all parameters from the request
        $data = $this->request->getParams();
        
        // Ensure the ID in the data matches the ID in the URL
        $data['id'] = $id;
        
        // Save the updated publication object
        $object = $this->objectService->saveObject('publication', $data);
        
        // Return the updated object as a JSON response
        return new JSONResponse($object);
    }

    /**
     * Delete a publication.
     *
     * @param string|int $id The ID of the publication to delete.
     * @param ObjectService $objectService The service to handle object operations.
     * @return JSONResponse The response indicating the result of the deletion.
     */
    public function destroy(string|int $id, ObjectService $objectService): JSONResponse
    {
        // Delete the publication object
        $result = $this->objectService->deleteObject('publication', $id);
        
        // Return the result as a JSON response
        return new JSONResponse(['success' => $result]);
    }
}
