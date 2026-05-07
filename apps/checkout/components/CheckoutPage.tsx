'use client'

import { useState, useEffect } from 'react'
import type { CartItem } from '@shop/api-client'

const FREE_DELIVERY_THRESHOLD = 75

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data: CartItem[]) => {
        setItems(data)
        setQuantities(Object.fromEntries(data.map((i) => [i.id, i.quantity])))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const subtotal = items.reduce((s, i) => s + i.price * (quantities[i.id] ?? i.quantity), 0)
  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 2.99
  const total = subtotal + shipping
  const progressPct = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal
  const orderNumber = `SH-${Math.floor(Math.random() * 900000) + 100000}`

  if (orderPlaced) {
    return (
      <div className="w-full max-w-[640px] mx-auto px-6 lg:px-10 py-20 text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-light tracking-tight mb-3">Order placed</h1>
        <p className="text-sm text-neutral-600 mb-1">
          Thanks for your order. A confirmation has been sent to your email.
        </p>
        <p className="text-xs text-neutral-400 mb-8">
          Order reference <span className="font-mono">{orderNumber}</span> · £{total.toFixed(2)}
        </p>
        <a
          href="/"
          className="inline-block bg-black text-white text-xs font-medium tracking-widest uppercase px-7 py-3.5 hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 py-8">
      <h1 className="text-2xl font-light tracking-tight mb-6">Bag</h1>

      <div className="mb-6">
        <p className="text-xs text-neutral-600 mb-2">
          {remaining > 0
            ? `Spend £${remaining.toFixed(2)} more for FREE Delivery`
            : 'This order qualifies for FREE Delivery'}
        </p>
        <div className="relative h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-black transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-[#B5975A] rounded-sm"
            style={{ left: `${(FREE_DELIVERY_THRESHOLD / (FREE_DELIVERY_THRESHOLD * 1.1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>£0</span>
          <span>£{FREE_DELIVERY_THRESHOLD}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse border-b border-neutral-100 pb-4">
                  <div className="w-[120px] h-[120px] bg-neutral-100 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-100 w-3/4" />
                    <div className="h-3 bg-neutral-100 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              <p>Your bag is empty.</p>
              <a href="/" className="mt-4 inline-block text-black underline underline-offset-2 text-xs tracking-widest uppercase">
                Continue Shopping
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => {
                const qty = quantities[item.id] ?? item.quantity
                return (
                  <li key={item.id} className="flex gap-5 py-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-[120px] h-[120px] object-cover flex-shrink-0 bg-neutral-50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-snug">{item.name}</p>
                          <p className="text-xs text-neutral-500 mt-1">{item.material}</p>
                          <p className="text-sm font-medium mt-1">£{item.price}</p>
                        </div>
                        <button
                          className="text-neutral-400 hover:text-black transition-colors flex-shrink-0"
                          aria-label={`Remove ${item.name}`}
                          onClick={() =>
                            setItems((prev) => prev.filter((i) => i.id !== item.id))
                          }
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-500 hover:text-black transition-colors"
                            onClick={() =>
                              setQuantities((prev) => ({
                                ...prev,
                                [item.id]: Math.max(1, (prev[item.id] ?? qty) - 1),
                              }))
                            }
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span className="w-8 text-center text-sm">{qty}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-lg text-neutral-500 hover:text-black transition-colors"
                            onClick={() =>
                              setQuantities((prev) => ({
                                ...prev,
                                [item.id]: (prev[item.id] ?? qty) + 1,
                              }))
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button className="text-xs text-neutral-500 hover:text-black underline underline-offset-2 transition-colors">
                          Save to Wishlist
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div>
          <div className="border border-neutral-200 p-5 sticky top-[130px]">
            <h2 className="text-xs tracking-widest uppercase font-medium mb-5">Order Summary</h2>

            <div className="flex items-center justify-between py-3 border-b border-neutral-100 mb-4">
              <span className="text-sm">Enter promo code</span>
              <button className="text-xs tracking-widest uppercase underline underline-offset-2">Add</button>
            </div>

            <div className="space-y-3 text-sm">
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

            <div className="border-t border-neutral-200 mt-4 pt-4 mb-5">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5">Tax Included</p>
            </div>

            <button
              onClick={() => setOrderPlaced(true)}
              disabled={items.length === 0}
              className="w-full bg-black text-white text-xs font-medium tracking-widest uppercase py-4 hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              Checkout
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div className="space-y-2.5">
              <button className="w-full border border-neutral-300 py-3 text-sm hover:border-neutral-500 transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#000"/></svg>
                Apple Pay
              </button>
              <button className="w-full border border-neutral-300 py-3 text-sm bg-[#ffb3c7] hover:bg-[#ff99b8] transition-colors font-medium">
                Klarna · Express Checkout
              </button>
              <button className="w-full border border-neutral-300 py-3 text-sm bg-[#b2f0e8] hover:bg-[#9deae0] transition-colors font-medium">
                Checkout with Clearpay ⚡
              </button>
              <button className="w-full border border-neutral-300 py-3 text-sm bg-[#ffc439] hover:bg-[#f0b429] transition-colors font-medium">
                PayPal
              </button>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5975A" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                Pay in 3 interest-free instalments with Klarna
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5975A" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                Free standard delivery when you spend £75+
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B5975A" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                Free 100-night mattress trial
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
