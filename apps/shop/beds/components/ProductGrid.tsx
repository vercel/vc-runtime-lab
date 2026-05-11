import { Link } from '@vercel/microfrontends/next/client'
import Image from 'next/image'
import type { Product } from '@shop/api-client'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-neutral-400 text-sm">
        No products found.
      </div>
    )
  }

  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group block"
        >
          <div className="relative aspect-square overflow-hidden mb-3 bg-neutral-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-black text-white text-[9px] tracking-widest uppercase px-2 py-0.5">
                New
              </span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className="absolute top-2 left-2 bg-white text-black text-[9px] tracking-widest uppercase px-2 py-0.5 border border-neutral-200">
                Bestseller
              </span>
            )}
          </div>

          <h3 className="text-sm leading-snug group-hover:underline underline-offset-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{product.material}</p>

          {product.rating && (
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill={i < Math.floor(product.rating!) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neutral-600"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] text-neutral-400">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          <p className="text-sm font-medium mt-1.5">£{product.price}</p>
        </Link>
      ))}
    </div>
  )
}
