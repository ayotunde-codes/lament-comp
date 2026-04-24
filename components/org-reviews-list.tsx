'use client'

import { useState } from 'react'
import { useOrgReviews } from '@/services/reviews/queries'
import { useCardReveal } from '@/hooks/use-card-reveal'
import ReviewCard from './review-card'
import type { SortOrder } from '@/types'
import type { ListReviewsParams } from '@/services/reviews/types'

const SORT_OPTIONS: SortOrder[] = ['Latest', 'Top', 'Lowest']

const SORT_MAP: Record<SortOrder, ListReviewsParams['sort']> = {
  Latest: 'latest',
  Top: 'top',
  Lowest: 'lowest',
}

interface Props {
  orgId: string
  orgName: string
}

export default function OrgReviewsList({ orgId, orgName }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('Latest')
  const listRef = useCardReveal<HTMLDivElement>(sortOrder)

  const reviewsQuery = useOrgReviews(orgId, SORT_MAP[sortOrder])
  const reviews = reviewsQuery.data?.pages.flatMap(p => p.data) ?? []

  return (
    <div className="space-y-4">
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

      {reviewsQuery.isLoading ? (
        <div className="flex justify-center py-20">
          <span className="text-muted text-sm">Loading…</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-base font-medium text-primary">No reviews yet</p>
          <p className="text-sm text-muted mt-1">Be the first to review {orgName}</p>
        </div>
      ) : (
        <>
          <div ref={listRef} className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} data-card>
                <ReviewCard review={review} orgName={orgName} hideOrgName />
              </div>
            ))}
          </div>
          {reviewsQuery.hasNextPage && (
            <button
              onClick={() => reviewsQuery.fetchNextPage()}
              disabled={reviewsQuery.isFetchingNextPage}
              className="w-full py-3 text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
            >
              {reviewsQuery.isFetchingNextPage ? 'Loading…' : 'Load more'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
