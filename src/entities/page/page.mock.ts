import { Page } from './page'
import { TPage } from './page.types'

/**
 * Mock data function that returns an array of page data objects
 * Used for testing and development purposes
 */
export const mockPageData = (): TPage[] => [
	{ // full data
		id: '1',
		uuid: '123e4567-e89b-12d3-a456-426614174000',
		name: 'Test Page',
		slug: 'test-page',	
		contents: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	// @ts-expect-error -- expected missing contents
	{ // partial data
		id: '2', 
		uuid: '123e4567-e89b-12d3-a456-426614174001',
		name: 'Another Page',
		slug: 'another-page',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{ // invalid data
		id: '3',
		uuid: '123e4567-e89b-12d3-a456-426614174002', 
		name: '',
		slug: '',
		contents: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
]

/**
 * Creates an array of Page instances from provided data or default mock data
 * @param data Optional array of page data to convert to Page instances
 * @returns Array of Page instances
 */
export const mockPage = (data: TPage[] = mockPageData()): TPage[] => data.map(item => new Page(item))
