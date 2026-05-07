import { Link } from '@vercel/microfrontends/next/client'

const MATTRESS_TYPES = [
  { label: 'All Mattresses', slug: 'all' },
  { label: 'Memory Foam', slug: 'memory-foam' },
  { label: 'Pocket Sprung Hybrid', slug: 'hybrid' },
]

const FIRMNESS = [
  { label: 'Soft', slug: 'soft' },
  { label: 'Medium', slug: 'medium' },
  { label: 'Firm', slug: 'firm' },
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

export default function MattressesMegaMenu() {
  return (
    <div role="region" aria-label="Mattresses mega menu" style={panelStyle}>
      <div className="shop-mega-grid shop-mega-grid-3">
        <div>
          <h3 style={headingStyle}>Type</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MATTRESS_TYPES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={c.slug === 'all' ? '/mattresses' : `/mattresses/${c.slug}`}
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
          <h3 style={headingStyle}>Firmness</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FIRMNESS.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/mattresses/${f.slug}`}
                  style={{ ...linkRowStyle, padding: '8px 0' }}
                  className="hover:underline underline-offset-2"
                >
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div />
      </div>
    </div>
  )
}
