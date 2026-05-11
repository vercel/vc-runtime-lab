import { Link } from '@vercel/microfrontends/next/client'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Beds', href: '/beds' },
      { label: 'Platform Beds', href: '/beds/platform' },
      { label: 'Four-Poster Beds', href: '/beds/four-poster' },
      { label: 'Upholstered Beds', href: '/beds/upholstered' },
      { label: 'Mattresses', href: '/mattresses' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'My Account', href: '#' },
      { label: 'Delivery & Assembly', href: '#' },
      { label: '100-Night Trial', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Care Guides', href: '#' },
      { label: 'Mattress Size Guide', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Showrooms', href: '#' },
      { label: 'Bespoke Sizing', href: '#' },
      { label: 'Old Mattress Removal', href: '#' },
      { label: 'Trade Programme', href: '#' },
      { label: 'Klarna · 0% Finance', href: '#' },
      { label: 'Gift Cards', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Cookie Settings', href: '#' },
      { label: 'Modern Slavery Statement', href: '#' },
    ],
  },
  {
    title: 'About Shop',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Craftsmanship & Materials', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="bg-neutral-50 border-t border-neutral-200">
        <div className="px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-600 hover:text-black transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-neutral-200">
        <div className="px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[17px] font-bold tracking-[0.18em] uppercase">SHOP</span>

          <p className="text-[11px] text-neutral-500 order-3 md:order-2 text-center">
            UNITED KINGDOM&nbsp;&nbsp;|&nbsp;&nbsp;English&nbsp;&nbsp;|&nbsp;&nbsp;
            All rights reserved. 2025 Shop
          </p>

          <div className="flex items-center gap-4 order-2 md:order-3">
            <a href="#" aria-label="Instagram" className="text-neutral-500 hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest" className="text-neutral-500 hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.52-.25 1.05.52 1.91 1.55 1.91 1.86 0 3.1-2.41 3.1-5.26 0-2.16-1.46-3.78-4.11-3.78-3 0-4.87 2.24-4.87 4.74 0 .86.25 1.46.65 1.93.18.21.2.3.14.54-.05.17-.15.58-.19.74-.06.24-.25.33-.46.24-1.31-.54-1.93-1.98-1.93-3.6 0-2.67 2.26-5.89 6.76-5.89 3.63 0 6.01 2.65 6.01 5.49 0 3.77-2.09 6.59-5.15 6.59-1.03 0-2-.55-2.33-1.18l-.63 2.42c-.23.88-.85 1.98-1.27 2.65.96.3 1.97.46 3.03.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-neutral-500 hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}
