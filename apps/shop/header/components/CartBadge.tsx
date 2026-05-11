'use client'

import { useEffect, useState } from 'react'
import { cartCount, readCartCookieFromDocument } from '@shop/api-client'

export default function CartBadge() {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const readCount = () => {
      const entries = readCartCookieFromDocument()
      setCount(cartCount(entries))
    }

    readCount()

    window.addEventListener('focus', readCount)
    window.addEventListener('shop:cart-updated', readCount)
    return () => {
      window.removeEventListener('focus', readCount)
      window.removeEventListener('shop:cart-updated', readCount)
    }
  }, [])

  if (!mounted || count === 0) return null

  return (
    <span
      aria-label={`${count} items in bag`}
      className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-black text-white text-[10px] font-medium leading-none rounded-full"
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
