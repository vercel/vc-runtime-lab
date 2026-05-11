import { Link } from '@vercel/microfrontends/next/client'

const CATEGORIES = [
  { label: 'Beds & Headboards', slug: 'beds' },
  { label: 'Mattresses', slug: 'mattresses' },
  { label: 'Bedding & Linens', slug: 'bedding' },
  { label: 'Bedside Tables & Storage', slug: 'storage' },
]

const HIGHLIGHTS = [
  { label: 'Up to 50% off Mattresses', slug: 'mattresses' },
  { label: 'Last Few Beds', slug: 'last-few' },
]

const panelStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 60,
  background: 'white',
  borderTop: '1px solid rgb(245 245 245)',
  boxShadow: '0 12px 24px -8px rgba(0,0,0,0.12)',
}

const linkRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: 14,
  color: 'rgb(38 38 38)',
  padding: '4px 0',
}

const iconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 9999,
  background: 'rgb(245 245 245)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const iconInnerStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 9999,
  background: 'rgb(212 212 212)',
}

const headingStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'rgb(163 163 163)',
  marginBottom: 16,
}

function IconDot() {
  return (
    <span aria-hidden style={iconStyle}>
      <span style={iconInnerStyle} />
    </span>
  )
}

export default function SaleMegaMenu() {
  return (
    <div role="region" aria-label="Sale mega menu" style={panelStyle}>
      <div className="shop-mega-grid shop-mega-grid-2">
        <div>
          <h3 style={headingStyle}>Shop the Sale</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/sale/${c.slug}`}
                  style={linkRowStyle}
                  className="hover:underline underline-offset-2"
                >
                  <IconDot />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={headingStyle}>Highlights</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HIGHLIGHTS.map((h) => (
              <li key={h.slug}>
                <Link
                  href={`/sale/${h.slug}`}
                  style={linkRowStyle}
                  className="hover:underline underline-offset-2"
                >
                  <IconDot />
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
