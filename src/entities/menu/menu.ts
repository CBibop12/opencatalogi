import { SafeParseReturnType, z } from 'zod'
import { TMenu } from './menu.types'

/**
 * Menu class representing a navigation menu entity with validation
 * Implements the TMenu interface for type safety
 */
export class Menu implements TMenu {

	public id: string
	public uuid: string
	public name: string
	public position: number
	public items: string // JSON string containing menu items
	public createdAt: string
	public updatedAt: string

	/**
	 * Creates a new Menu instance
	 * @param data Initial menu data conforming to TMenu interface
	 */
	constructor(data: TMenu) {
		this.hydrate(data)
	}

	/* istanbul ignore next */ // Jest does not recognize the code coverage of these 2 methods
	/**
	 * Hydrates the menu object with provided data
	 * @param {TMenu} data Menu data to populate the instance
	 */
	private hydrate(data: TMenu) {
		this.id = data?.id?.toString() || ''
		this.uuid = data?.uuid || ''
		this.name = data?.name || ''
		this.position = data?.position || 0
		this.items = data?.items || '[]' // Default to empty array in JSON string format
		this.createdAt = data?.createdAt || ''
		this.updatedAt = data?.updatedAt || ''
	}

	/* istanbul ignore next */
	/**
	 * Validates the menu data against a schema
	 * @return {SafeParseReturnType<TMenu, unknown>} SafeParseReturnType containing validation result
	 */
	public validate(): SafeParseReturnType<TMenu, unknown> {
		// Schema validation for menu data
		const schema = z.object({
			name: z.string().min(1, 'naam is verplicht'),
			position: z.number().min(0, 'positie moet 0 of hoger zijn'),
			items: z.string().min(2, 'items zijn verplicht'), // At least '[]'
		})

		const result = schema.safeParse({
			...this,
		})

		return result
	}

}
