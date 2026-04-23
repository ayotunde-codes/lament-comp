function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 space-y-3 animate-pulse">
      {/* Top row: avatar · username/timestamp · org+rating */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-elevated shrink-0" />
        <div className="flex-1 flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded bg-elevated" />
            <div className="h-2.5 w-12 rounded bg-elevated" />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="h-2.5 w-16 rounded bg-elevated" />
            <div className="h-2.5 w-14 rounded bg-elevated" />
          </div>
        </div>
      </div>
      {/* Content row */}
      <div className="space-y-2">
        <div className="h-4 w-3/5 rounded bg-elevated" />
        <div className="h-3 w-full rounded bg-elevated" />
        <div className="h-3 w-4/5 rounded bg-elevated" />
      </div>
      {/* Action row */}
      <div className="flex items-center gap-4">
        <div className="h-3 w-8 rounded bg-elevated" />
        <div className="h-3 w-8 rounded bg-elevated" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="h-9 w-52 rounded-full bg-elevated animate-pulse" />
        <div className="h-8 w-8 rounded bg-elevated animate-pulse" />
      </div>
      <ul className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i}><SkeletonCard /></li>
        ))}
      </ul>
    </section>
  )
}
