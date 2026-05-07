export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  material: string
  image: string
  description: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isBestseller?: boolean
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  material: string
}

export interface CartCount {
  count: number
}
