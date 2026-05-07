'use client'

import { useState, useEffect, useMemo } from 'react'
import { Link } from '@vercel/microfrontends/next/client'
import ProductGrid from './ProductGrid'
import type { Product } from '@shop/api-client'

interface Props {
  subcategory?: string
}

type FilterGroup = {
  title: string
  items: { label: string; slug: string }[]
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    title: 'Style',
    items: [
      { label: 'All Beds', slug: 'all' },
      { label: 'Platform Beds', slug: 'platform' },
      { label: 'Four-Poster Beds', slug: 'four-poster' },
      { label: 'Upholstered Beds', slug: 'upholstered' },
    ],
  },
  {
    title: 'Size',
    items: [
      { label: 'Single', slug: 'single' },
      { label: 'Double', slug: 'double' },
      { label: 'King', slug: 'king' },
      { label: 'Super King', slug: 'super-king' },
    ],
  },
  {
    title: 'Finish',
    items: [
      { label: 'Solid Oak', slug: 'oak' },
      { label: 'American Walnut', slug: 'walnut' },
      { label: 'Linen-Upholstered', slug: 'linen' },
    ],
  },
]

function selectBeds(all: Product[], subcategory: string): Product[] {
  const beds = all.filter((p) => p.category === 'beds')
  if (subcategory === 'all' || !subcategory) return beds
  // Match by subcategory
  const matching = beds.filter((p) => p.subcategory === subcategory)
  if (matching.length > 0) return matching
  // Fallback: match by material slug heuristics
  if (subcategory === 'oak') return beds.filter((p) => /oak/i.test(p.material))
  if (subcategory === 'walnut') return beds.filter((p) => /walnut/i.test(p.material))
  if (subcategory === 'linen') return beds.filter((p) => /linen/i.test(p.material))
  if (subcategory === 'pine') return beds.filter((p) => /pine/i.test(p.material))
  return beds
}

function labelForSlug(slug: string): string {
  for (const group of FILTER_GROUPS) {
    const found = group.items.find((i) => i.slug === slug)
    if (found) return found.label
  }
  return 'Beds'
}

export default function BedsPage({ subcategory = 'all' }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const activeSlug = subcategory
  const breadcrumbLabel = useMemo(() => labelForSlug(activeSlug), [activeSlug])

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(selectBeds(data, activeSlug)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [activeSlug])

  return (
    <div className="w-full">
      <div className="bg-[#f3eee5] py-2.5 text-center">
        <p className="text-[11px] tracking-wide text-neutral-800">
          <strong>FREE WHITE-GLOVE DELIVERY</strong> — On orders over £750
        </p>
      </div>

      <div className="px-6 lg:px-10 py-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/beds" className="hover:text-black transition-colors">Beds</Link>
          {activeSlug !== 'all' && (
            <>
              <span>/</span>
              <span className="text-black">{breadcrumbLabel}</span>
            </>
          )}
        </nav>

        <h1 className="text-2xl font-light tracking-tight mb-8">
          {activeSlug === 'all' ? 'Beds' : breadcrumbLabel}
        </h1>

        <div className="flex gap-8">
          <aside className="w-56 flex-shrink-0 hidden md:block">
            {FILTER_GROUPS.map((group) => (
              <div key={group.title} className="mb-8">
                <h2 className="text-[11px] tracking-widest uppercase font-medium mb-3 text-neutral-500">
                  {group.title}
                </h2>
                <ul className="space-y-1">
                  {group.items.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={sub.slug === 'all' ? '/beds' : `/beds/${sub.slug}`}
                        className={`
                          flex items-center gap-2.5 w-full text-left text-sm py-1 transition-colors
                          ${activeSlug === sub.slug ? 'font-medium text-black' : 'text-neutral-600 hover:text-black'}
                        `}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-colors ${
                            activeSlug === sub.slug ? 'border-black bg-black' : 'border-neutral-300'
                          }`}
                        />
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {loading ? (
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-neutral-100 mb-3" />
                  <div className="h-3 bg-neutral-100 mb-2 w-3/4" />
                  <div className="h-3 bg-neutral-100 w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="flex-1 text-sm text-neutral-500 py-20 text-center">
              No beds in this collection yet.
            </p>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>

    </div>
  )
}
