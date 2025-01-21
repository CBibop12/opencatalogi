export type TMenuSubItem = {
    name: string
    slug: string
    description?: string
    icon?: string
}

export type TMenuItem = {
    name: string
    slug: string
    description?: string
    icon?: string
    items?: TMenuSubItem[]
}

/**
 * Type definition for a Menu object
 * Represents the structure of a navigation menu with items and metadata
 */
export type TMenu = {
    id: string // Unique identifier for the menu
    uuid: string // UUID for the menu
    name: string // Display name of the menu
    position: number // Order/position of the menu in navigation
    items: TMenuItem[] // Array of menu items
    createdAt: string // Creation timestamp
    updatedAt: string // Last update timestamp
}
