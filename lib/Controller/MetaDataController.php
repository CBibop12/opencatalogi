<?php

namespace OCA\OpenCatalog\Controller;

use OCA\OpenCatalog\Service\ObjectService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IAppConfig;
use OCP\IRequest;

class MetaDataController extends Controller
{
    const TEST_ARRAY = [
        "6892aeb1-d92d-4da5-ad41-f1c3278f40c2" => [
            "id" => "6892aeb1-d92d-4da5-ad41-f1c3278f40c2",
            "name" => "MetaData one",
            "summary" => "summary for one"
        ],
        "a375d626-ffe8-4a26-a024-1ad452d1b931" => [
            "id" => "a375d626-ffe8-4a26-a024-1ad452d1b931",
            "name" => "MetaData two",
            "summary" => "summary for two"
        ]
    ];

    public function __construct(
		$appName,
		IRequest $request,
		private readonly IAppConfig $config
	)
    {
        parent::__construct($appName, $request);
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
            //Application::APP_ID,
            'opencatalog',
            'metaDataIndex',
            []
        );
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
	public function index(ObjectService $objectService): JSONResponse
	{
		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$filters = $this->request->getParams();

		foreach($filters as $key => $value) {
			if(str_starts_with($key, '_')) {
				unset($filters[$key]);
			}
		}



		$filters['_schema'] = 'metadata';

		$result = $objectService->findObjects(filters: $filters, config: $dbConfig);

		$results = ["results" => $result['documents']];
		return new JSONResponse($results);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function show(string $id, ObjectService $objectService): JSONResponse
	{
		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$filters['_id'] = $id;

		$result = $objectService->findObject(filters: $filters, config: $dbConfig);

		return new JSONResponse($result);
	}


	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function create(ObjectService $objectService): JSONResponse
	{
		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$data = $this->request->getParams();

		foreach($data as $key => $value) {
			if(str_starts_with($key, '_')) {
				unset($data[$key]);
			}
		}

		$data['_schema'] = 'metadata';

		$returnData = $objectService->saveObject(
			data: $data,
			config: $dbConfig
		);

		// get post from requests
		return new JSONResponse($returnData);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function update(string $id, ObjectService $objectService): JSONResponse
	{
		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$data = $this->request->getParams();

		foreach($data as $key => $value) {
			if(str_starts_with($key, '_')) {
				unset($data[$key]);
			}
		}
		if (isset($data['id'])) {
			unset( $data['id']);
		}

		$filters['_id'] = $id;
		$returnData = $objectService->updateObject(
			filters: $filters,
			update: $data,
			config: $dbConfig
		);

		// get post from requests
		return new JSONResponse($returnData);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function destroy(string $id, ObjectService $objectService): JSONResponse
	{
		$dbConfig['base_uri'] = $this->config->getValueString(app: $this->appName, key: 'mongodbLocation');
		$dbConfig['headers']['api-key'] = $this->config->getValueString(app: $this->appName, key: 'mongodbKey');
		$dbConfig['mongodbCluster'] = $this->config->getValueString(app: $this->appName, key: 'mongodbCluster');

		$filters['_id'] = $id;
		$returnData = $objectService->deleteObject(
			filters: $filters,
			config: $dbConfig
		);

		// get post from requests
		return new JSONResponse($returnData);
	}
}
