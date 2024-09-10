import { Publication } from './publication'
import { TPublication } from './publication.types'

export const mockPublicationsData = (): TPublication[] => [
	{ // full data
		id: '1',
		reference: 'ref1',
		title: 'test 1',
		summary: 'a short form summary',
		description: 'a really really long description about this catalogus',
		image: 'https://example.com/image.jpg',
		category: 'category1',
		portal: 'https://google.com',
		catalogi: { // full data
			id: '1',
			title: 'Decat',
			summary: 'a short form summary',
			description: 'a really really long description about this catalogus',
			image: 'string',
			listed: false,
			organisation: {
				id: '1',
				title: 'Decat',
				summary: 'a short form summary',
				description: 'a really really long description about this organisation',
				oin: 'string',
				tooi: 'string',
				rsin: 'string',
				pki: 'string',
			},
			metadata: ['1', '3'],
		},
		metaData: { // full data
			id: '1',
			title: 'Test metadata',
			description: 'this is a very long description for test metadata',
			summary: 'this is a summary',
			version: '0.0.1',
			required: ['test'],
			properties: {
				test: {
					title: 'test prop',
					description: 'a long description',
					type: 'string',
					format: 'date',
					pattern: 1,
					default: 'true',
					behavior: 'silly',
					required: false,
					deprecated: false,
					minLength: 5,
					maxLength: 6,
					example: 'gooby example',
					minimum: 1,
					maximum: 3,
					multipleOf: 1,
					exclusiveMin: false,
					exclusiveMax: false,
					minItems: 0,
					maxItems: 6,
				},
				gfdgds: {
					title: 'gfdgds prop',
					description: 'property description',
					type: 'string',
					format: 'uuid',
					pattern: 2,
					default: 'false',
					behavior: 'goofy perchance',
					required: false,
					deprecated: false,
					minLength: 5.5,
					maxLength: 5.11,
					example: 'bazinga',
					minimum: 1,
					maximum: 2,
					multipleOf: 1,
					exclusiveMin: true,
					exclusiveMax: false,
					minItems: 1,
					maxItems: 7,
				},
			},
			archive: {
				valuation: 'b',
				class: 1,
			},
			source: 'https://nextcloud.test.commonground.nu/apps/opencatalogi/api/metadata/b2f02f60-3243-49a1-82eb-75a133090e18',
		},
		published: '2024-01-01',
		modified: '2024-01-02',
		featured: true,
		data: {
			key: 'anyvalue',
			streetNumber: 1,
			object: {
				blabla: 'bla',
			},
			array: ['appel', 'peer', 0, [], {}],
		},
		attachments: [],
		attachmentCount: 1,
		schema: 'https://schema.org',
		status: 'Concept',
		license: 'MIT',
		themes: ['theme1'],
		anonymization: {
			anonymized: true,
			results: '',
		},
		language: {
			code: 'en-us',
			level: 'A1',
		},
		archive: {
			date: new Date(2023, 2, 24).toISOString(),
		},
		geo: {
			type: 'Point',
			coordinates: [2, 23],
		},
	},
	{ // partial data
		id: '2',
		reference: 'ref2',
		title: 'test 2',
		summary: 'a short form summary',
		description: '',
		image: '',
		category: 'category2',
		portal: '',
		catalogi: '',
		metaData: '',
		published: '2024-01-01',
		modified: '2024-01-02',
		featured: true,
		data: {
			type: '',
		},
		attachments: [],
		attachmentCount: 1,
		schema: 'https://schema.org',
		status: 'Concept',
		license: 'MIT',
		themes: ['theme1'],
		anonymization: {
			anonymized: true,
			results: '',
		},
		language: {
			code: 'en-us',
			level: 'A1',
		},
		archive: {
			date: new Date(2023, 2, 24).toISOString(),
		},
		geo: {
			type: 'Point',
			coordinates: [2, 23],
		},
	},
	{ // invalid data
		id: '3',
		reference: 'ref3',
		title: 'test 3',
		summary: 'a short form summary',
		description: 'a really really long description about this catalogus',
		image: 'https://example.com/image.jpg',
		category: 'category3',
		portal: 'https://google.com',
		catalogi: { // full data
			id: '3',
			title: 'Foo',
			summary: 'a short form summary',
			description: 'a really really long description about this catalogus',
			image: 'string',
			// @ts-expect-error -- listed needs to be a boolean
			listed: 0.2,
			organisation: {
				id: '1',
				title: 'Decat',
				summary: 'a short form summary',
				description: 'a really really long description about this organisation',
				oin: 'string',
				tooi: 'string',
				rsin: 'string',
				pki: 'string',
			},
			metadata: ['1', '3'],
		},
		metaData: { // full data
			id: '1',
			title: 'Test metadata',
			description: 'this is a very long description for test metadata',
			summary: 'this is a summary',
			version: '0.0.1',
			required: ['test'],
			properties: {
				test: {
					title: 'test prop',
					description: 'a long description',
					type: 'string',
					format: 'date',
					pattern: 1,
					default: 'true',
					behavior: 'silly',
					required: false,
					deprecated: false,
					minLength: 5,
					maxLength: 6,
					example: 'gooby example',
					minimum: 1,
					maximum: 3,
					multipleOf: 1,
					exclusiveMin: false,
					exclusiveMax: false,
					minItems: 0,
					maxItems: 6,
				},
				gfdgds: {
					title: 'gfdgds prop',
					description: 'property description',
					type: 'string',
					format: 'uuid',
					pattern: 2,
					default: 'false',
					behavior: 'goofy perchance',
					required: false,
					deprecated: false,
					minLength: 5.5,
					maxLength: 5.11,
					example: 'bazinga',
					minimum: 1,
					maximum: 2,
					multipleOf: 1,
					exclusiveMin: true,
					exclusiveMax: false,
					minItems: 1,
					maxItems: 7,
				},
			},
			archive: {
				valuation: 'b',
				class: 1,
			},
			source: 'https://nextcloud.test.commonground.nu/apps/opencatalogi/api/metadata/b2f02f60-3243-49a1-82eb-75a133090e18',
		},
		published: '2024-01-01',
		modified: '2024-01-02',
		featured: true,
		data: {
			type: '',
		},
		attachments: [],
		attachmentCount: 1,
		schema: 'https://schema.org',
		// @ts-expect-error -- invalid data for testing
		status: true,
		license: 'MIT',
		themes: ['theme1'],
		anonymization: {
			anonymized: true,
			results: '',
		},
		language: {
			code: 'en-us',
			level: 'A1',
		},
		archive: {
			date: new Date(2023, 2, 24).toISOString(),
		},
		geo: {
			type: 'Point',
			coordinates: [2, 23],
		},
	},
]

export const mockPublications = (data: TPublication[] = mockPublicationsData()): TPublication[] => data.map(item => new Publication(item))
