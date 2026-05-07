'use client'

import { useEffect, useState } from 'react'
import { getCartItems, subscribeToCart } from '@shop/api-client'

export default function CartBadge() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let mounted = true
    const refresh = () =>
      getCartItems().then((items) => {
        if (!mounted) return
        setCount(items.reduce((sum, i) => sum + i.quantity, 0))
      })
    refresh()
    const unsubscribe = subscribeToCart(refresh)
    // Polling fallback in case the same-tab custom-event doesn't reach
    // this client island when it's hydrated inside a remote component.
    const interval = window.setInterval(refresh, 1500)
    return () => {
      mounted = false
      unsubscribe()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <a
      href="/checkout"
      className="relative flex items-center group"
      aria-label={`Bag (${count} item${count === 1 ? '' : 's'})`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="group-hover:stroke-neutral-500 transition-colors"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-medium leading-none rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </a>
  )
}
