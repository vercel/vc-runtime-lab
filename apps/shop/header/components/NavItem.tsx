'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from '@vercel/microfrontends/next/client'

interface NavItemProps {
  href: string
  label: string
  children: ReactNode
}

/**
 * Desktop (fine pointer): CSS :hover opens the menu. Clicking a link sets
 *   data-open="false" which overrides :hover (same specificity, later in CSS).
 *   The override clears on the next mousemove over the element.
 * Touch / coarse pointer: first tap opens (data-open="true"), second navigates.
 *   A tap outside or Escape closes it.
 */
export default function NavItem({ href, label, children }: NavItemProps) {
  // null  = no override — CSS :hover / :focus-within controls visibility
  // true  = explicitly open (touch)
  // false = explicitly closed after a click, overrides CSS :hover
  const [open, setIsOpen] = useState<null | boolean>(null)
  const [isHoverOpen, setIsHoverOpen] = useState(false)
  const wrapperRef = useRef<HTMLLIElement>(null)

  const isVisible = open === true || (open !== false && isHoverOpen)

  useEffect(() => {
    if (!isVisible) return

    function handlePointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(null)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isVisible])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window === 'undefined') return
    const isCoarsePointer = window.matchMedia('(hover: none)').matches
    if (isCoarsePointer && !open) {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <li
      ref={wrapperRef}
      className="shop-nav-group flex-shrink-0"
      data-open={open ?? undefined}
      onMouseEnter={() => setIsHoverOpen(true)}
      onMouseLeave={() => setIsHoverOpen(false)}
      onFocusCapture={(e) => {
        if (wrapperRef.current?.contains(e.target as Node)) setIsHoverOpen(true)
      }}
      onBlurCapture={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) setIsHoverOpen(false)
      }}
      onMouseMove={() => {
        if (open === false) setIsOpen(null)
      }}
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest('a[href]')) setIsOpen(false)
      }}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="shop-nav-tab block px-3 py-3 text-[13px] tracking-wide whitespace-nowrap transition-colors duration-150 hover:text-neutral-500"
        style={{ borderBottom: '2px solid transparent' }}
        aria-haspopup="true"
        aria-expanded={isVisible}
      >
        {label}
      </Link>
      <div className="shop-mega-menu">{children}</div>
    </li>
  )
}
