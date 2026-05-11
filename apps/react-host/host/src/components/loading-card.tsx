export function LoadingCard({ title }: { title: string }) {
  return (
    <div className="loading-card" aria-label={`${title} loading`}>
      <span />
      <span />
      <span />
    </div>
  );
}
