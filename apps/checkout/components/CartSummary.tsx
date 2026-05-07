import type { CartItem } from '@shop/api-client'

interface Props {
  items?: CartItem[]
  showCheckoutButton?: boolean
}

const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL ?? 'http://localhost:3000'

async function getCart(): Promise<CartItem[]> {
  try {
    const res = await fetch(`${SHELL_URL}/api/cart`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function CartSummary({ items: propItems, showCheckoutButton = false }: Props) {
  const items = propItems ?? (await getCart())
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 2.99
  const total = subtotal + shipping

  return (
    <div className="border border-neutral-200 p-5">
      <h3 className="text-xs tracking-widest uppercase font-medium mb-4">Order Summary</h3>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-600">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">Delivery</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="border-t border-neutral-200 mt-4 pt-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-neutral-400 mt-0.5">Tax Included</p>
      </div>

      {showCheckoutButton && (
        <a
          href="/checkout"
          className="block w-full bg-black text-white text-xs font-medium tracking-widest uppercase text-center py-3.5 mt-4 hover:bg-neutral-800 transition-colors"
        >
          Checkout
        </a>
      )}
    </div>
  )
}
