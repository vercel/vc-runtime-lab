'use client'

import { useState, useEffect } from 'react'
import type { CartItem } from '@shop/api-client'

export default function MiniCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div className="w-full max-w-[360px] bg-white border border-neutral-200 shadow-lg">
      <div className="px-5 py-4 border-b border-neutral-100">
        <h2 className="text-xs font-medium tracking-widest uppercase">Bag</h2>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="px-5 py-8 flex justify-center">
            <div className="w-5 h-5 border-2 border-neutral-200 border-t-black rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <svg
              className="mx-auto mb-3 text-neutral-300"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="text-sm text-neutral-500">Your bag is empty</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 px-5 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-[72px] h-[72px] object-cover flex-shrink-0 bg-neutral-50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{item.material}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium mt-1">£{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="px-5 py-4 border-t border-neutral-100">
          <div className="flex justify-between items-center mb-3.5">
            <span className="text-xs tracking-wider uppercase text-neutral-500">Bag</span>
            <span className="text-base font-medium">£{total}</span>
          </div>
          <a
            href="/checkout"
            className="block w-full bg-black text-white text-xs font-medium tracking-widest uppercase text-center py-3.5 hover:bg-neutral-800 transition-colors"
          >
            View Cart
          </a>
        </div>
      )}

    </div>
  )
}
