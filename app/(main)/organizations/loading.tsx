export default function OrganizationsLoading() {
  return (
    <section className="py-6 flex flex-col gap-4">
      <div className="h-7 w-40 bg-elevated rounded-lg animate-pulse" />
      <div className="h-10 bg-elevated rounded-xl animate-pulse" />
      <div className="flex gap-2 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-elevated rounded-full animate-pulse shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 bg-elevated rounded-2xl animate-pulse" />
        ))}
      </div>
    </section>
  )
}
