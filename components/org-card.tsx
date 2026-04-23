import Link from 'next/link'
import type { Organization } from '@/types'
import StarRating from './star-rating'

const LOGO_COLORS = [
  '#7C3AED', '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#06B6D4', '#F97316',
]

function getLogoColor(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return LOGO_COLORS[hash % LOGO_COLORS.length]
}

interface OrgCardProps {
  org: Organization
}

export default function OrgCard({ org }: OrgCardProps) {
  return (
    <Link
      href={`/organizations/${org.id}`}
      className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3 hover:border-accent/50 transition-colors"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
        style={{ backgroundColor: getLogoColor(org.id) }}
        aria-hidden="true"
      >
        {org.logo}
      </div>
      <div>
        <p className="text-primary font-semibold text-sm leading-snug">{org.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-star text-xs font-semibold">{org.averageRating.toFixed(1)}</span>
          <StarRating rating={org.averageRating} size="sm" />
        </div>
        <p className="text-muted text-xs mt-0.5">({org.reviewCount} reviews)</p>
      </div>
    </Link>
  )
}
