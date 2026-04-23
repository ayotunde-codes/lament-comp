'use client'

import Link from 'next/link'
import type { Organization, Review, SortOrder } from '@/types'
import StarRating from './star-rating'
import ReviewCard from './review-card'
import { useSort } from '@/hooks/use-sort'
import { useCardReveal } from '@/hooks/use-card-reveal'

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

const SORT_OPTIONS: SortOrder[] = ['Latest', 'Top', 'Lowest']

interface OrgDetailViewProps {
  org: Organization
  reviews: Review[]
}

export default function OrgDetailView({ org, reviews }: OrgDetailViewProps) {
  const { sorted, sortOrder, setSortOrder } = useSort(reviews)
  const listRef = useCardReveal<HTMLDivElement>(sortOrder)

  return (
    <div className="space-y-5 pb-32">

      {/* Back + share */}
      <div className="flex items-center justify-between">
        <Link
          href="/organizations"
          className="flex items-center gap-1 text-muted hover:text-primary transition-colors -ml-1"
          aria-label="Back to organizations"
        >
          <BackIcon />
        </Link>
        <button
          type="button"
          aria-label="Share this organization"
          className="text-muted hover:text-primary transition-colors p-1"
        >
          <ShareIcon />
        </button>
      </div>

      {/* Org hero */}
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

      {/* Sort tabs */}
      <div className="flex gap-2" role="group" aria-label="Sort reviews">
        {SORT_OPTIONS.map(option => (
          <button
            key={option}
            onClick={() => setSortOrder(option)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              sortOrder === option
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-muted hover:text-primary'
            }`}
            aria-pressed={sortOrder === option}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Reviews */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-base font-medium text-primary">No reviews yet</p>
          <p className="text-sm text-muted mt-1">Be the first to review {org.name}</p>
        </div>
      ) : (
        <div ref={listRef} className="space-y-4">
          {sorted.map(review => (
            <div key={review.id} data-card>
              <ReviewCard review={review} orgName={org.name} hideOrgName />
            </div>
          ))}
        </div>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-16 md:bottom-6 left-0 md:left-[220px] xl:right-[280px] right-0 px-4 z-30">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/review"
            className="block w-full py-4 text-center bg-accent hover:bg-accent-hover rounded-2xl text-white font-semibold text-sm transition-colors"
          >
            Write Anonymous Review
          </Link>
        </div>
      </div>

    </div>
  )
}
