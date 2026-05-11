import { Link } from '@vercel/microfrontends/next/client'
import SearchBar from './SearchBar'
import NavItem from './NavItem'
import MegaMenu from './MegaMenu'
import MattressesMegaMenu from './MattressesMegaMenu'
import SaleMegaMenu from './SaleMegaMenu'
import CartBadge from './CartBadge'

export default function Header() {
  return (
    <header className="relative w-full bg-white border-b border-neutral-200 sticky top-0 z-50">
      <style>{`
        .shop-nav-group .shop-mega-menu { display: none; }
        .shop-nav-group:hover .shop-mega-menu,
        .shop-nav-group:focus-within .shop-mega-menu,
        .shop-nav-group[data-open="true"] .shop-mega-menu { display: block; }
        .shop-nav-group:hover > .shop-nav-tab,
        .shop-nav-group:focus-within > .shop-nav-tab,
        .shop-nav-group[data-open="true"] > .shop-nav-tab { border-bottom-color: black; }
        .shop-nav-group[data-open="false"] .shop-mega-menu { display: none; }
        .shop-nav-group[data-open="false"] > .shop-nav-tab { border-bottom-color: transparent; }

        .shop-mega-grid { display: grid; gap: 48px; margin: 0 auto; padding: 40px 40px; }
        .shop-mega-grid-3 { max-width: 1400px; grid-template-columns: 1fr 1fr 1fr; }
        .shop-mega-grid-2 { max-width: 720px; grid-template-columns: 1fr 1fr; }

        @media (max-width: 768px) {
          .shop-mega-menu { max-height: calc(100vh - 120px); overflow-y: auto; }
          .shop-mega-grid { padding: 24px 20px; gap: 24px; }
          .shop-mega-grid-3,
          .shop-mega-grid-2 { grid-template-columns: 1fr; max-width: 100%; }
        }
      `}</style>

      {/* <div className="px-6 lg:px-10 h-[68px] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex-shrink-0 text-[22px] font-bold tracking-[0.18em] uppercase select-none"
          aria-label="Shop home"
        >
          SHOP
        </Link>

        <div className="flex-1 max-w-[360px]">
          <SearchBar />
        </div>

        <div className="flex items-center gap-5 text-black">
          <button className="flex flex-col items-center gap-0.5 group" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button className="flex flex-col items-center gap-0.5 group hidden md:flex" aria-label="Find a showroom">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>

          <button className="flex flex-col items-center gap-0.5 group hidden md:flex" aria-label="My account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <Link
            href="/checkout"
            className="relative flex flex-col items-center gap-0.5 group"
            aria-label="Bag"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <CartBadge />
          </Link>
        </div>
      </div>

      <nav className="relative border-t border-neutral-100" aria-label="Main navigation">
        <ul className="flex items-center px-6 lg:px-10 overflow-x-auto scrollbar-none">
          <NavItem href="/beds" label="Beds">
            <MegaMenu />
          </NavItem>
          <NavItem href="/mattresses" label="Mattresses">
            <MattressesMegaMenu />
          </NavItem>
          <NavItem href="/sale" label="Sale">
            <SaleMegaMenu />
          </NavItem>
        </ul>
      </nav> */}

    </header>
  )
}
