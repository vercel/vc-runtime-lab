export function HeaderSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 bg-white">
      <div className="h-[72px] animate-pulse bg-neutral-50" />
      <div className="h-[44px] animate-pulse bg-neutral-50 border-t border-neutral-100" />
    </div>
  )
}

export function FooterSkeleton() {
  return <div className="h-[400px] animate-pulse bg-neutral-50" />
}

export function PageSkeleton() {
  return (
    <div className="min-h-[600px] animate-pulse">
      <div className="w-full h-[600px] bg-neutral-100" />
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-neutral-100 mb-3" />
          <div className="h-3 bg-neutral-100 mb-2 w-3/4" />
          <div className="h-3 bg-neutral-100 w-1/2" />
        </div>
      ))}
    </div>
  )
}
