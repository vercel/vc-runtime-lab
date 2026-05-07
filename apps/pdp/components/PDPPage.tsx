'use client'

import { useState, useEffect } from 'react'
import { Link } from '@vercel/microfrontends/next/client'
import type { Product } from '@shop/api-client'

interface Props {
  productId?: string
}

const FINISH_OPTIONS: { label: string; swatch: string }[] = [
  { label: 'Solid Oak', swatch: '#c2a986' },
  { label: 'American Walnut', swatch: '#6b4a30' },
  { label: 'Whitewashed Pine', swatch: '#e8dec7' },
  { label: 'Charcoal Stained', swatch: '#3a3530' },
]

export default function PDPPage({ productId = 'p-1' }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFinish, setSelectedFinish] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/${productId}`)
      .then((r) => r.json())
      .then((p: Product) => setProduct(p))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [productId])

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square bg-neutral-100" />
          <div className="space-y-4">
            <div className="h-6 bg-neutral-100 w-3/4" />
            <div className="h-4 bg-neutral-100 w-1/4" />
            <div className="h-20 bg-neutral-100" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="px-6 py-16 text-center text-neutral-500 text-sm">Product not found.</div>
    )
  }

  return (
    <div className="w-full">
      <div className="px-6 lg:px-10 py-6">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-black transition-colors capitalize">
            {product.category}
          </Link>
          {product.subcategory && (
            <>
              <span>/</span>
              <Link href={`/${product.category}/${product.subcategory}`} className="hover:text-black transition-colors capitalize">
                {product.subcategory.replace(/-/g, ' ')}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
          <div className="flex gap-3">
            <div className="hidden md:flex flex-col gap-2 w-[72px]">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="relative aspect-square overflow-hidden border-2 border-transparent hover:border-neutral-300 transition-colors"
                  style={{ background: product.gradient, opacity: 1 - i * 0.18 }}
                  aria-label={`View angle ${i + 1}`}
                />
              ))}
            </div>

            <div
              className="flex-1 relative aspect-square overflow-hidden"
              style={{ background: product.gradient }}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-light tracking-tight leading-snug">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill={i < Math.floor(product.rating!) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-neutral-700"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-neutral-500">{product.reviewCount?.toLocaleString()} reviews</span>
              </div>
            )}

            <p className="text-xl font-medium mt-4">£{product.price}</p>

            <div className="mt-5">
              <p className="text-xs tracking-wider uppercase text-neutral-500 mb-2">Finish</p>
              <div className="flex flex-wrap gap-2">
                {FINISH_OPTIONS.map((finish, i) => (
                  <button
                    key={finish.label}
                    onClick={() => setSelectedFinish(i)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all
                      ${selectedFinish === i ? 'border-black scale-110' : 'border-neutral-300 hover:border-neutral-500'}
                    `}
                    style={{ background: finish.swatch }}
                    aria-label={finish.label}
                    title={finish.label}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-600 mt-1.5">{FINISH_OPTIONS[selectedFinish].label}</p>
            </div>

            <div className="mt-5 pb-5 border-b border-neutral-100">
              <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>
              <button className="text-xs underline underline-offset-2 mt-2 text-neutral-500 hover:text-black">
                View specifications
              </button>
            </div>

            <button className="flex items-center justify-between w-full py-4 border-b border-neutral-100 text-sm group">
              <span className="tracking-wide">Choose Your Size</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              onClick={handleAddToCart}
              className={`
                w-full py-4 text-xs font-medium tracking-widest uppercase transition-colors mt-5
                ${added ? 'bg-neutral-700 text-white' : 'bg-black text-white hover:bg-neutral-800'}
              `}
            >
              {added ? '✓ Added to Bag' : `£${product.price} — Add to Bag`}
            </button>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 py-3 border-b border-neutral-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5975A" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 17v-6h6v6" />
                </svg>
                <div>
                  <p className="text-xs font-medium tracking-wide">White-Glove Delivery</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Two-person assembly into your bedroom included</p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3 border-b border-neutral-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5975A" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <div>
                  <p className="text-xs font-medium tracking-wide">100-Night Trial</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Try it at home — full refund if it isn't right
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
