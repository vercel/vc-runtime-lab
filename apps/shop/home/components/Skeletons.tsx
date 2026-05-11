export function HeaderSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 bg-white">
      <div className="h-[68px] animate-pulse bg-neutral-50" />
      <div className="h-[44px] animate-pulse bg-neutral-50 border-t border-neutral-100" />
    </div>
  )
}

export function FooterSkeleton() {
  return <div className="h-[400px] animate-pulse bg-neutral-50" />
}
