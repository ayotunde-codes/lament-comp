'use client'

import Link from 'next/link'
import { useOrganization } from '@/services/organizations/queries'
import StarRating from './star-rating'
import OrgReviewsList from './org-reviews-list'

const LOGO_COLORS = [
  '#7C3AED', '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#06B6D4', '#F97316',
]

function getLogoColor(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return LOGO_COLORS[hash % LOGO_COLORS.length]
}

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)

interface Props {
  id: string
}

export default function OrgDetailView({ id }: Props) {
  const { data: org, isLoading, isError } = useOrganization(id)

  if (isLoading) {
    return <div className="flex justify-center py-20"><span className="text-muted text-sm">Loading…</span></div>
  }

  if (isError || !org) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-base font-medium text-primary">Organization not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-32">

      <div className="flex items-center justify-between">
        <Link href="/organizations" className="flex items-center gap-1 text-muted hover:text-primary transition-colors -ml-1" aria-label="Back to organizations">
          <BackIcon />
        </Link>
        <button type="button" aria-label="Share this organization" className="text-muted hover:text-primary transition-colors p-1">
          <ShareIcon />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
          style={{ backgroundColor: getLogoColor(org.id) }}
          aria-hidden="true"
        >
          {org.logo}
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary leading-tight">{org.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-star font-semibold text-base">{org.averageRating.toFixed(1)}</span>
            <StarRating rating={org.averageRating} size="md" />
          </div>
          <p className="text-xs text-muted mt-0.5">{org.reviewCount} reviews</p>
        </div>
      </div>

      <OrgReviewsList orgId={org.id} orgName={org.name} />

      <div className="fixed bottom-16 md:bottom-6 left-0 md:left-[220px] xl:right-[280px] right-0 px-4 z-30">
        <div className="max-w-2xl mx-auto">
          <Link href="/review" className="block w-full py-4 text-center bg-accent hover:bg-accent-hover rounded-2xl text-white font-semibold text-sm transition-colors">
            Write Anonymous Review
          </Link>
        </div>
      </div>

    </div>
  )
}
