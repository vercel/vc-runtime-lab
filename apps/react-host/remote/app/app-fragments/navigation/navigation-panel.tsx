'use client';

import Link from 'next/link';

const targets = [
  { href: '/', label: 'home' },
  { href: '/dashboard', label: 'dashboard' },
  { href: '/reports', label: 'reports' },
  { href: '/settings', label: 'settings' },
];

export function NavigationPanel({ active }: { active: string }) {
  return (
    <div className="app-nav-card">
      <style>{`
        :host { display: block; }
        .app-nav-card {
          background: linear-gradient(135deg, #ecfeff, #f0fdf4);
          border: 1px solid #99f6e4;
          border-radius: 8px;
          color: #134e4a;
          display: grid;
          gap: 14px;
          padding: 16px;
        }
        .app-nav-card h3 { font-size: 1rem; margin: 0; }
        .app-nav-card menu {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .app-nav-card a {
          align-items: center;
          background: #ffffff;
          border: 1px solid #5eead4;
          border-radius: 8px;
          color: #0f766e;
          display: inline-flex;
          min-height: 36px;
          padding: 7px 10px;
          text-decoration: none;
        }
        .app-nav-card [aria-current="page"],
        .app-nav-card a:hover {
          background: #0f766e;
          border-color: #0f766e;
          color: #ffffff;
        }
      `}</style>
      <h3>Remote navigation</h3>
      <menu>
        {targets.map((target) => (
          <li key={target.href}>
            <Link
              aria-current={active === target.href ? 'page' : undefined}
              href={target.href}
            >
              {target.label}
            </Link>
          </li>
        ))}
      </menu>
    </div>
  );
}
