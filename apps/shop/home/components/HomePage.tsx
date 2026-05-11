import { Link } from '@vercel/microfrontends/next/client'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative w-full h-[85vh] min-h-[520px] overflow-hidden bg-neutral-200">
        <Image
          src="/products/hero-bedroom.jpg"
          alt="Serene minimalist bedroom interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 md:p-14 max-w-[520px]">
          <p className="text-white/80 text-[11px] tracking-widest uppercase mb-3">
            Designed in-house
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight leading-none mb-6">
            A Bedroom Built to Last
          </h1>
          <Link
            href="/beds"
            className="inline-block bg-white text-black text-xs font-medium tracking-widest uppercase px-7 py-3.5 hover:bg-neutral-100 transition-colors"
          >
            Shop Beds
          </Link>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 opacity-60">
          <button
            className="w-7 h-7 border border-white/60 text-white flex items-center justify-center"
            aria-label="Pause slideshow"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
          <button
            className="w-7 h-7 border border-white/60 text-white flex items-center justify-center"
            aria-label="Next slide"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      </section>

      <section className="bg-[#f3eee5] py-3 text-center">
        <p className="text-[12px] tracking-wide text-neutral-800">
          <strong>FREE WHITE-GLOVE DELIVERY</strong> on orders over £750 —{' '}
          <Link href="#" className="underline underline-offset-2">
            Find out more
          </Link>
        </p>
      </section>

      {/* Editorial banner */}
      <section className="relative w-full aspect-[16/7] overflow-hidden mb-1 bg-neutral-200">
        <Image
          src="/products/hero-mattress.jpg"
          alt="Crisp linen bedding on a luxurious mattress"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16 max-w-[480px]">
          <p className="text-white/70 text-[11px] tracking-widest uppercase mb-2">100-night trial</p>
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-5 leading-tight">
            Sleep on it, risk-free.
          </h2>
          <Link
            href="/mattresses"
            className="inline-block border border-white/60 text-white/90 text-xs font-medium tracking-widest uppercase px-6 py-3 w-fit hover:bg-white hover:text-black transition-colors"
          >
            Shop Mattresses
          </Link>
        </div>
      </section>

    </div>
  )
}
