'use client'

import Link from 'next/link'
import { useTopOrganizations } from '@/services/organizations/queries'
import type { Organization } from '@/types'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function OrgRow({ org, rank }: { org: Organization; rank: number }) {
  return (
    <Link
      href={`/organizations/${org.id}`}
      className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-elevated transition-colors"
    >
      <span className="text-xs text-muted w-4 text-center shrink-0">{rank}</span>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elevated text-xs font-bold text-primary border border-border shrink-0">
        {org.logo}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary truncate">{org.name}</p>
        <p className="text-xs text-muted">{org.industry}</p>
      </div>
      <div className="flex items-center gap-1 text-star shrink-0">
        <StarIcon />
        <span className="text-xs font-medium">{org.averageRating}</span>
      </div>
    </Link>
  )
}

export default function RightPanel() {
  const { data: topOrgs = [] } = useTopOrganizations()

  return (
    <aside className="hidden xl:flex flex-col fixed right-0 top-0 h-screen w-[280px] bg-canvas border-l border-border z-40 px-4 py-6">
      <h2 className="text-sm font-semibold text-primary mb-1">Top Organizations</h2>
      <p className="text-xs text-muted mb-4">This week</p>
      <div className="flex flex-col">
        {topOrgs.slice(0, 5).map((org, i) => (
          <OrgRow key={org.id} org={org} rank={i + 1} />
        ))}
      </div>
    </aside>
  )
}
