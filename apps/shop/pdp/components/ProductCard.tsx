import { Link } from '@vercel/microfrontends/next/client'
import Image from 'next/image'
import type { Product } from '@shop/api-client'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
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
      </div>
      <h3 className="text-sm leading-snug line-clamp-2 group-hover:underline underline-offset-2">
        {product.name}
      </h3>
      <p className="text-xs text-neutral-500 mt-0.5">{product.material}</p>
      <p className="text-sm font-medium mt-1">£{product.price}</p>
    </Link>
  )
}
