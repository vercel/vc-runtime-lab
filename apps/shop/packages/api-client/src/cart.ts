import type { CartItem, Product } from './types'

const STORAGE_KEY = 'shop:cart'

function readStorage(): CartItem[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : null
  } catch {
    return null
  }
}

const UPDATE_EVENT = 'shop:cart:updated'

function writeStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT))
  } catch {}
}

export function subscribeToCart(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onChange = () => callback()
  window.addEventListener(UPDATE_EVENT, onChange)
  // Cross-tab sync via storage event
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(UPDATE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}

export async function getCartItems(): Promise<CartItem[]> {
  const stored = readStorage()
  if (stored !== null) return stored
  try {
    const res = await fetch('/api/cart')
    if (res.ok) {
      const items = (await res.json()) as CartItem[]
      writeStorage(items)
      return items
    }
  } catch {}
  return []
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const stored = readStorage() ?? []
  const existing = stored.find((i) => i.productId === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    stored.push({
      id: `ci-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      material: product.material,
    })
  }
  writeStorage(stored)
  return stored
}

export function setCartItems(items: CartItem[]) {
  writeStorage(items)
}
