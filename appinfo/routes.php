<?php

return [
    'resources' => [
        'metadata' => ['url' => '/metadata/api'],
        'publications' => ['url' => '/publications/api'],
        'attachments' => ['url' => '/attachments/api'],
        'catalogi' => ['url' => '/catalogi/api'],
        'directory' => ['url' => '/directory/api']
    ],
	'routes' => [
		['name' => 'dashboard#page', 'url' => '/', 'verb' => 'GET'],
		['name' => 'metadata#page', 'url' => '/metadata', 'verb' => 'GET'],
		['name' => 'publications#page', 'url' => '/publications', 'verb' => 'GET'],
		['name' => 'catalogi#page', 'url' => '/catalogi', 'verb' => 'GET'],
		['name' => 'search#page', 'url' => '/search', 'verb' => 'GET'],
		['name' => 'search#index', 'url' => '/search/api', 'verb' => 'GET'],
		['name' => 'directory#page', 'url' => '/directory', 'verb' => 'GET'],
        ['name' => 'configuration#index', 'url' => '/configuration', 'verb' => 'GET'],
        ['name' => 'configuration#create', 'url' => '/configuration', 'verb' => 'POST']
	],
];
