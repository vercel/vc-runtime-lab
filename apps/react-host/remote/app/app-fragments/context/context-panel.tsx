'use client';

import { useDemoContext } from 'vc-runtime-lab-shared-context';

export function ContextPanel() {
  const context = useDemoContext();

  return (
    <article className="context-card">
      <style>{`
        :host { display: block; }
        .context-card {
          background: #f7fee7;
          border: 1px solid #bef264;
          border-radius: 8px;
          color: #365314;
          display: grid;
          gap: 10px;
          padding: 16px;
        }
        .context-card h3 { font-size: 1rem; margin: 0; }
        .context-card dl {
          display: grid;
          gap: 8px;
          grid-template-columns: max-content 1fr;
          margin: 0;
        }
        .context-card dt { color: #4d7c0f; font-weight: 700; }
        .context-card dd { margin: 0; overflow-wrap: anywhere; }
      `}</style>
      <h3>Remote context</h3>
      <dl>
        <dt>account</dt>
        <dd>{context.account}</dd>
        <dt>theme</dt>
        <dd>{context.theme}</dd>
      </dl>
    </article>
  );
}
