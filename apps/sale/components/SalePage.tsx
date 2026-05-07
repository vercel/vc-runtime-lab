'use client'

import { useState, useEffect, useMemo } from 'react'
import { Link } from '@vercel/microfrontends/next/client'
import type { Product } from '@shop/api-client'

interface Props {
  category?: string
}

const FILTER_CHIPS = [
  'Beds',
  'Mattresses',
  'Bedding',
  'Under £200',
  'Last Few',
]

function labelForSlug(slug: string): string {
  const titles: Record<string, string> = {
    beds: 'Beds & Headboards on Sale',
    mattresses: 'Mattresses on Sale',
    bedding: 'Bedding & Linens on Sale',
    storage: 'Bedside Tables & Storage on Sale',
    'last-few': 'Last Few',
  }
  return titles[slug] ?? 'Sale'
}

function selectSaleItems(all: Product[], category?: string): Product[] {
  const onSale = all.filter((p) => p.originalPrice || p.category === 'sale')
  if (!category) return onSale
  if (category === 'beds') return onSale.filter((p) => p.category === 'beds')
  if (category === 'mattresses') return onSale.filter((p) => p.category === 'mattresses')
  if (category === 'bedding') return onSale.filter((p) => /linen|duvet|bedding|cotton/i.test(p.material))
  if (category === 'storage') return onSale.filter((p) => /storage|bedside|table/i.test(p.name))
  if (category === 'last-few') return onSale.slice(0, 3)
  return onSale
}

export default function SalePage({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const breadcrumbLabel = useMemo(
    () => (category ? labelForSlug(category) : null),
    [category]
  )

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(selectSaleItems(data, category)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="w-full">
      <div className="bg-[#f3eee5] py-2.5 text-center">
        <p className="text-[11px] tracking-wide text-neutral-800">
          End-of-season sale — up to 50% off selected lines.{' '}
          <Link href="#" className="underline underline-offset-2">See all</Link>
        </p>
      </div>

      <div className="px-6 lg:px-10 py-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/sale" className="hover:text-black transition-colors">Sale</Link>
          {breadcrumbLabel && (
            <>
              <span>/</span>
              <span className="text-black">{breadcrumbLabel}</span>
            </>
          )}
        </nav>

        <div className="max-w-md mb-8">
          <h1 className="text-4xl font-light tracking-tight mb-4">
            {breadcrumbLabel ? breadcrumbLabel.toUpperCase() : 'SALE'}
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Refresh the bedroom for less. Selected beds, mattresses and accessories at up to 50% off — while stock lasts.
          </p>
        </div>

        <div className="border-b border-neutral-200 mb-6 flex items-center gap-8">
          <button className="pb-3 text-xs tracking-widest uppercase font-medium text-neutral-400 cursor-default">
            Discover
          </button>
          <button className="pb-3 text-xs tracking-widest uppercase font-medium border-b-2 border-black cursor-default">
            Shop <span className="text-neutral-400 ml-1">[{products.length || '—'}]</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pb-6 mb-2 border-b border-neutral-100 overflow-x-auto">
          <button className="flex items-center gap-2 px-3 py-2 text-[11px] tracking-widest uppercase font-medium whitespace-nowrap border border-neutral-200 hover:border-black transition-colors">
            Filter & Sort
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="10" y2="18" />
            </svg>
          </button>
          <span className="text-neutral-300">|</span>
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              className="text-[11px] tracking-widest uppercase font-medium text-neutral-500 hover:text-black whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 pt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-neutral-100 mb-3" />
                <div className="h-3 bg-neutral-100 mb-2 w-3/4" />
                <div className="h-3 bg-neutral-100 w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-neutral-500 py-20 text-center">Nothing in the sale matches that filter.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 pt-8">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <div
                  className="relative aspect-square mb-3 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ background: p.gradient }}
                >
                  {p.isBestseller && (
                    <span className="absolute top-2 left-2 bg-white text-[9px] tracking-widest uppercase font-medium px-2 py-1 z-10">
                      Bestseller
                    </span>
                  )}
                  {p.isNew && (
                    <span className="absolute top-2 left-2 bg-white text-[9px] tracking-widest uppercase font-medium px-2 py-1 z-10">
                      New
                    </span>
                  )}
                  {p.originalPrice && (
                    <span className="absolute top-2 right-2 bg-black text-white text-[9px] tracking-widest uppercase font-medium px-2 py-1 z-10">
                      Sale
                    </span>
                  )}
                </div>
                <p className="text-xs leading-snug line-clamp-2 group-hover:underline underline-offset-2">{p.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{p.material}</p>
                <p className="text-xs font-medium mt-1">
                  £{p.price}
                  {p.originalPrice && (
                    <span className="ml-2 text-neutral-400 line-through font-normal">£{p.originalPrice}</span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
