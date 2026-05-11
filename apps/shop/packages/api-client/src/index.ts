export type { Product, CartItem, CartCount } from './types'
export { apiFetch } from './fetcher'
export { MOCK_PRODUCTS, findProductById, findProductsByCategory } from './mock-products'
export {
  CART_COOKIE_NAME,
  CART_COOKIE_MAX_AGE,
  type CartEntry,
  encodeCart,
  decodeCart,
  cartCount,
  cartSubtotal,
  addToCartEntry,
  updateCartQuantity,
  removeCartEntry,
  hydrateCart,
  readCartCookieFromDocument,
  writeCartCookieFromDocument,
  getCartItems,
  setCartItems,
} from './cart'
