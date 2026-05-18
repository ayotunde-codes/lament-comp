'use client'

import { useOrganizations } from '@/hooks/use-organizations'
import SearchBar from '@/components/search-bar'
import FilterChips from '@/components/filter-chips'
import OrgCard from '@/components/org-card'

export default function OrganizationsPage() {
  const { filtered, query, setQuery, activeIndustry, setActiveIndustry } = useOrganizations()

  return (
    <section className="py-6 flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-primary tracking-tight leading-tight">Companies</h1>
      <SearchBar value={query} onChange={setQuery} />
      <FilterChips selected={activeIndustry} onChange={setActiveIndustry} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map(org => (
          <OrgCard key={org.id} org={org} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center col-span-full gap-2">
          <p className="text-4xl">🫖</p>
          <p className="font-display text-lg font-semibold text-primary">Couldn&apos;t find that one.</p>
          <p className="text-sm text-muted">Try a different name or industry.</p>
        </div>
      )}
    </section>
  )
}
