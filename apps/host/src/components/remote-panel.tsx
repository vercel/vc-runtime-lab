import type { ReactNode } from 'react';

export type CodeUrls = {
  host: string;
  remote: string;
};

export function RemotePanel({
  codeUrls,
  label,
  children,
}: {
  codeUrls: CodeUrls;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="panel" data-panel={label}>
      <div className="panel-title">
        <h2>{label}</h2>
        <div className="panel-links">
          <a href={codeUrls.host} rel="noreferrer" target="_blank">
            host code
          </a>
          <a href={codeUrls.remote} rel="noreferrer" target="_blank">
            remote code
          </a>
        </div>
      </div>
      {children}
    </section>
  );
}
