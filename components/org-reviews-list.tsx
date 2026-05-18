'use client'

import { useState } from 'react'
import { useOrgReviews } from '@/services/reviews/queries'
import { useCardReveal } from '@/hooks/use-card-reveal'
import { REVIEW_TAGS } from '@/constants/review-tags'
import ReviewCard from './review-card'
import type { SortOrder } from '@/types'
import type { ListReviewsParams } from '@/services/reviews/types'
import { motion } from 'framer-motion'

const SORT_OPTIONS: SortOrder[] = ['Latest', 'Top', 'Lowest']

const SORT_LABELS: Record<SortOrder, string> = {
  Latest: 'Fresh',
  Top: 'Hot',
  Lowest: 'Lowest',
}

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
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined)

  const listRef = useCardReveal<HTMLDivElement>(`${sortOrder}-${activeTag}`)

  const reviewsQuery = useOrgReviews(orgId, SORT_MAP[sortOrder], activeTag)
  const reviews = reviewsQuery.data?.pages.flatMap(p => p.data) ?? []

  function handleTagClick(tag: string) {
    setActiveTag(prev => prev === tag ? undefined : tag)
  }

  return (
    <div className="space-y-4">

      {/* Sort + tag controls */}
      <div className="space-y-3">
        <div className="flex gap-2" role="group" aria-label="Sort spills">
          {SORT_OPTIONS.map(option => (
            <button
              key={option}
              onClick={() => setSortOrder(option)}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium"
              aria-pressed={sortOrder === option}
            >
              {sortOrder === option && (
                <motion.span
                  layoutId="org-sort-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${sortOrder === option ? 'text-canvas' : 'text-muted'}`}>
                {SORT_LABELS[option]}</span>
            </button>
          ))}
        </div>

        {/* Tag filter chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
          role="group"
          aria-label="Filter by topic"
        >
          <button
            onClick={() => setActiveTag(undefined)}
            aria-pressed={!activeTag}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              !activeTag
                ? 'bg-accent/15 border-accent/50 text-accent'
                : 'border-border text-muted hover:border-accent/40 hover:text-primary'
            }`}
          >
            All topics
          </button>
          {REVIEW_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              aria-pressed={activeTag === tag}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeTag === tag
                  ? 'bg-accent/15 border-accent/50 text-accent'
                  : 'border-border text-muted hover:border-accent/40 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {reviewsQuery.isLoading ? (
        <div className="flex justify-center py-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Steeping…</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">🫖</p>
          {activeTag ? (
            <>
              <p className="font-display text-lg font-semibold text-primary">No {activeTag} spills yet.</p>
              <button onClick={() => setActiveTag(undefined)} className="text-sm text-accent hover:underline mt-2">
                Clear filter
              </button>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold text-primary">No tea on {orgName} yet.</p>
              <p className="text-sm text-muted mt-1">Be the first to spill.</p>
            </>
          )}
        </div>
      ) : (
        <>
          <div ref={listRef} className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} data-card>
                <ReviewCard
                  review={review}
                  orgName={orgName}
                  hideOrgName
                  onTagClick={handleTagClick}
                  activeTag={activeTag}
                />
              </div>
            ))}
          </div>
          {reviewsQuery.hasNextPage && (
            <button
              onClick={() => reviewsQuery.fetchNextPage()}
              disabled={reviewsQuery.isFetchingNextPage}
              className="w-full py-3 text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
            >
              {reviewsQuery.isFetchingNextPage ? 'Steeping…' : 'Load more'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
