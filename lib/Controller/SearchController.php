<?php

namespace OCA\OpenCatalogi\Controller;

use GuzzleHttp\Exception\GuzzleException;
use OCA\OpenCatalogi\Service\ElasticSearchService;
use OCA\OpenCatalogi\Db\PublicationMapper;
use OCA\OpenCatalogi\Service\SearchService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IAppConfig;
use OCP\IRequest;
use OCA\OpenCatalogi\Service\ObjectService;

class SearchController extends Controller
{

    public function __construct(
        $appName,
        IRequest $request,
		private readonly PublicationMapper $publicationMapper,
        private readonly IAppConfig $config,
		$corsMethods = 'PUT, POST, GET, DELETE, PATCH',
		$corsAllowedHeaders = 'Authorization, Content-Type, Accept',
		$corsMaxAge = 1728000
	) {
		parent::__construct($appName, $request);
		$this->corsMethods = $corsMethods;
		$this->corsAllowedHeaders = $corsAllowedHeaders;
		$this->corsMaxAge = $corsMaxAge;
    }

	/**
	 * This method implements a preflighted cors response for you that you can
	 * link to for the options request
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 * @since 7.0.0
	 */
	#[NoCSRFRequired]
	#[PublicPage]
	public function preflightedCors() {
		if (isset($this->request->server['HTTP_ORIGIN'])) {
			$origin = $this->request->server['HTTP_ORIGIN'];
		} else {
			$origin = '*';
		}

		$response = new Response();
		$response->addHeader('Access-Control-Allow-Origin', $origin);
		$response->addHeader('Access-Control-Allow-Methods', $this->corsMethods);
		$response->addHeader('Access-Control-Max-Age', (string)$this->corsMaxAge);
		$response->addHeader('Access-Control-Allow-Headers', $this->corsAllowedHeaders);
		$response->addHeader('Access-Control-Allow-Credentials', 'false');
		return $response;
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
            'SearchIndex',
            []
        );
    }

	/**
	 * The Index function.
	 *
	 * @param SearchService $searchService The Search Service.
	 *
	 * @return JSONResponse The Response.
	 */
	private function searchIndex(SearchService $searchService): JSONResponse
	{
		$elasticConfig['location'] = $this->config->getValueString(app: $this->appName, key: 'elasticLocation');
		$elasticConfig['key'] 	   = $this->config->getValueString(app: $this->appName, key: 'elasticKey');
		$elasticConfig['index']    = $this->config->getValueString(app: $this->appName, key: 'elasticIndex');

		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$filters = $this->request->getParams();
		unset($filters['_route']);

		// Status must be always published when searching for publications
		$filters['status'] = 'published';

		$fieldsToSearch = ['p.title', 'p.description', 'p.summary'];

		if ($this->config->hasKey($this->appName, 'elasticLocation') === false
			|| $this->config->getValueString($this->appName, 'elasticLocation') === ''
		) {
			$searchParams = $searchService->createMySQLSearchParams(filters: $filters);
			$searchConditions = $searchService->createMySQLSearchConditions(filters: $filters, fieldsToSearch:  $fieldsToSearch, searchParams: $searchParams);

			$limit = 30;
			$offset = 0;
			$page = 0;

			if (isset($filters['_limit']) === true) {
				$limit = (int) $filters['_limit'];
			}

			if (isset($filters['_page']) === true) {
				$page = (int) $filters['_page'];
				$offset = ($limit * ($filters['_page'] - 1));
			}

			if (isset($filters['_page']) === false) {
				$page = (floor($offset / $limit) + 1);
			}

			$filters = $searchService->unsetSpecialQueryParams(filters: $filters);

			$total   = $this->publicationMapper->count($filters);
			$results = $this->publicationMapper->findAll(limit: $limit, offset: $offset, filters: $filters, searchConditions: $searchConditions, searchParams: $searchParams);
			$pages   = (int) ceil($total / $limit);

			return new JSONResponse([
				'results' => $results,
				'facets'  => [],
				'count' => count($results),
				'limit' => $limit,
				'page' => $page,
				'pages' =>  $pages === 0 ? 1 : $pages,
				'total' => $total
			]);
		}

		//@TODO: find a better way to get query params. This fixes it for now.
		$keys   = array_keys(array: $filters);
		$values = array_values(array: $filters);

		$keys = str_replace('_', '.', $keys);

		$filters = array_combine(keys: $keys, values: $values);

		$requiredElasticConfig = ['location', 'key', 'index'];
		$missingFields = null;
		foreach ($requiredElasticConfig as $key) {
			if (isset($elasticConfig[$key]) === false || empty($elasticConfig[$key])) {
				$missingFields .= "$key, ";
			}
		}

		if ($missingFields !== null) {
			$errorMessage = "Missing the following elastic configuration: {$missingFields}please update your elastic connection in application settings.";
			$response = new JSONResponse(data: ['code' => 403, 'message' => $errorMessage], statusCode: 403);

			return $response;
		}

		$data = $searchService->search(parameters: $filters, elasticConfig: $elasticConfig, dbConfig: $dbConfig);

		return new JSONResponse($data);
	}


    /**
	 * @CORS
     * @PublicPage
	 * @NoCSRFRequired
     */
    public function index(SearchService $searchService): JSONResponse
    {
		return $this->searchIndex(searchService: $searchService);
    }

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 */
	public function indexInternal(SearchService $searchService): JSONResponse
	{
		return $this->searchIndex(searchService: $searchService);
	}


	/**
	 * The Show function.
	 *
	 * @param string|int $id The id.
	 * @param SearchService $searchService The Search Service.
	 * @param ObjectService $objectService The Object Service.
	 *
	 * @return JSONResponse The response.
	 * @throws GuzzleException
	 */
	private function searchShow(string|int $id, SearchService $searchService, ObjectService $objectService): JSONResponse
	{
		$elasticConfig['location'] = $this->config->getValueString(app: $this->appName, key: 'elasticLocation');
		$elasticConfig['key'] 	   = $this->config->getValueString(app: $this->appName, key: 'elasticKey');
		$elasticConfig['index']    = $this->config->getValueString(app: $this->appName, key: 'elasticIndex');

		if ($this->config->hasKey($this->appName, 'elasticLocation') === false
			|| $this->config->getValueString($this->appName, 'elasticLocation') === ''
		) {
			if ($this->config->hasKey($this->appName, 'mongoStorage') === false
				|| $this->config->getValueString($this->appName, 'mongoStorage') !== '1'
			) {
				try {
					$object = $this->publicationMapper->find(id: (int) $id);

					if ($object->getStatus() === 'published') {
						return new JSONResponse($object->jsonSerialize());
					}
					throw new DoesNotExistException('object not published');
				} catch (DoesNotExistException $exception) {
					return new JSONResponse(data: ['error' => 'Not Found'], statusCode: 404);
				}
			}

			$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
			$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
			$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

			$filters['_id'] = (string) $id;

			$result = $objectService->findObject(filters: $filters, config: $dbConfig);

			return new JSONResponse($result);
		}

		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$filters = ['_id' => (string) $id];

		$requiredElasticConfig = ['location', 'key', 'index'];
		$missingFields = null;
		foreach ($requiredElasticConfig as $key) {
			if (isset($elasticConfig[$key]) === false) {
				$missingFields .= "$key ";
			}
		}

		if ($missingFields !== null) {
			$errorMessage = "Missing the following elastic configuration: {$missingFields}please update your elastic connection in application settings.";
			return new JSONResponse(['message' => $errorMessage], 403);
		}

		$data = $searchService->search(parameters: $filters, elasticConfig: $elasticConfig, dbConfig: $dbConfig);

		if (count($data['results']) > 0) {
			return new JSONResponse($data['results'][0]);
		}

		return new JSONResponse(data: ['error' => ['code' => 404, 'message' => 'the requested resource could not be found']], statusCode: 404);
	}

	/**
	 * @CORS
	 * @PublicPage
	 * @NoCSRFRequired
	 */
	public function show(string|int $id, SearchService $searchService, ObjectService $objectService): JSONResponse
	{
		return $this->searchShow(id: $id, searchService: $searchService, objectService: $objectService);
	}

	/**
	 * @PublicPage
	 * @NoCSRFRequired
	 */
	public function showInternal(string|int $id, SearchService $searchService, ObjectService $objectService): JSONResponse
	{
		return $this->searchShow(id: $id, searchService: $searchService, objectService: $objectService);
	}

}
