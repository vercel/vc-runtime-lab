import type { CartItem, Product } from './types'

export interface CartEntry {
  productId: string
  quantity: number
}

export const CART_COOKIE_NAME = 'pandora_cart'
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export function encodeCart(entries: CartEntry[]): string {
  return JSON.stringify(entries)
}

export function decodeCart(raw: string | undefined | null): CartEntry[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (e): e is CartEntry =>
        typeof e?.productId === 'string' &&
        typeof e?.quantity === 'number' &&
        e.quantity > 0,
    )
  } catch {
    return []
  }
}

export function cartCount(entries: CartEntry[]): number {
  return entries.reduce((sum, e) => sum + e.quantity, 0)
}

export function cartSubtotal(entries: CartEntry[], products: Product[]): number {
  return entries.reduce((sum, e) => {
    const product = products.find((p) => p.id === e.productId)
    return product ? sum + product.price * e.quantity : sum
  }, 0)
}

export function addToCartEntry(
  entries: CartEntry[],
  productId: string,
  quantity = 1,
): CartEntry[] {
  const existing = entries.find((e) => e.productId === productId)
  if (existing) {
    return entries.map((e) =>
      e.productId === productId ? { ...e, quantity: e.quantity + quantity } : e,
    )
  }
  return [...entries, { productId, quantity }]
}

export function updateCartQuantity(
  entries: CartEntry[],
  productId: string,
  quantity: number,
): CartEntry[] {
  if (quantity <= 0) return removeCartEntry(entries, productId)
  return entries.map((e) =>
    e.productId === productId ? { ...e, quantity } : e,
  )
}

export function removeCartEntry(
  entries: CartEntry[],
  productId: string,
): CartEntry[] {
  return entries.filter((e) => e.productId !== productId)
}

export function hydrateCart(
  entries: CartEntry[],
  products: Product[],
): CartItem[] {
  return entries
    .map((e) => {
      const product = products.find((p) => p.id === e.productId)
      if (!product) return null
      return {
        id: `ci-${e.productId}`,
        productId: e.productId,
        name: product.name,
        price: product.price,
        quantity: e.quantity,
        image: product.image,
        material: product.material,
      } satisfies CartItem
    })
    .filter((c): c is CartItem => c !== null)
}

/**
 * Read the cart cookie value from `document.cookie`. Client-side only.
 */
export function readCartCookieFromDocument(): CartEntry[] {
  if (typeof document === 'undefined') return []
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CART_COOKIE_NAME}=`))
  if (!match) return []
  const raw = decodeURIComponent(match.slice(CART_COOKIE_NAME.length + 1))
  return decodeCart(raw)
}

/**
 * Persist `entries` to the cart cookie and notify listeners. Client-side only.
 */
export function writeCartCookieFromDocument(entries: CartEntry[]): void {
  if (typeof document === 'undefined') return
  document.cookie = `${CART_COOKIE_NAME}=${encodeURIComponent(encodeCart(entries))}; path=/; max-age=${CART_COOKIE_MAX_AGE}`
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('pandora:cart-updated'))
  }
}

/**
 * Read the cart cookie and hydrate it into `CartItem[]` by fetching the
 * products catalogue. Client-side only.
 */
export async function getCartItems(): Promise<CartItem[]> {
  const entries = readCartCookieFromDocument()
  if (entries.length === 0) return []
  const res = await fetch('/api/products')
  if (!res.ok) return []
  const products = (await res.json()) as Product[]
  return hydrateCart(entries, products)
}

/**
 * Persist `items` back to the cart cookie. Client-side only.
 */
export function setCartItems(items: CartItem[]): void {
  const entries: CartEntry[] = items.map((i) => ({
    productId: i.productId,
    quantity: i.quantity,
  }))
  writeCartCookieFromDocument(entries)
}
