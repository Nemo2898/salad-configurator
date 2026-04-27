// --------------------
// Base Types
// --------------------
export interface BaseType {
  id: number
  name: string
  price?: number
  image_url: string
  wedge_image_url?: string
  barcode_url: string
}

export interface Bowl extends BaseType {
  base_type_id?: number
  volume?: number
  slot_count: number
  shape: 'round' | 'square'
}

export interface Category {
  id: number
  name: string
  base_type_id?: number
}

export interface Ingredient extends BaseType {
  categoryId: number
  diets: string[]
  weight_grams?: number
}

// --------------------
// User & Recipe
// --------------------
export interface User {
  id: number
  email: string
  name?: string
  role: string
}

export interface Recipe {
  id: number
  userId: number
  name: string
  bowlId: number
  ingredientIds: number[]
  slots?: Record<string, Ingredient | null>
  is_public?: boolean
}

// --------------------
// Task 1.4: PriceListItem
// --------------------
export interface PriceListItem {
  id: number
  item_id: number
  price: number
  type?: string
}



