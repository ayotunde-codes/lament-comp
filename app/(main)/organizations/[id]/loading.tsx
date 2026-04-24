function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 space-y-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-elevated shrink-0" />
        <div className="flex-1 flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded bg-elevated" />
            <div className="h-2.5 w-12 rounded bg-elevated" />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="h-2.5 w-14 rounded bg-elevated" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/5 rounded bg-elevated" />
        <div className="h-3 w-full rounded bg-elevated" />
        <div className="h-3 w-4/5 rounded bg-elevated" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-3 w-8 rounded bg-elevated" />
        <div className="h-3 w-8 rounded bg-elevated" />
      </div>
    </div>
  )
}

export default function OrgDetailLoading() {
  return (
    <section className="py-6 flex flex-col gap-6">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-elevated shrink-0" />
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-elevated" />
          <div className="h-3 w-24 rounded bg-elevated" />
        </div>
      </div>
      <ul className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <li key={i}><SkeletonCard /></li>
        ))}
      </ul>
    </section>
  )
}
