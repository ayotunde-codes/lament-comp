'use client'

import { useState, useMemo } from 'react'
import { useReviewsFeed } from '@/services/reviews/queries'
import { useOrganizations } from '@/services/organizations/queries'
import ReviewCard from './review-card'
import { useCardReveal } from '@/hooks/use-card-reveal'
import type { ListReviewsParams } from '@/services/reviews/types'

type Tab = 'all' | 'trending' | 'latest'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'latest', label: 'Latest' },
]

const SORT_MAP: Record<Tab, ListReviewsParams['sort']> = {
  all: undefined,
  trending: 'top',
  latest: 'latest',
}

const FilterIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="4" x2="14" y2="4" /><line x1="10" y1="4" x2="3" y2="4" />
    <line x1="21" y1="12" x2="12" y2="12" /><line x1="8" y1="12" x2="3" y2="12" />
    <line x1="21" y1="20" x2="16" y2="20" /><line x1="12" y1="20" x2="3" y2="20" />
    <circle cx="12" cy="4" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="14" cy="20" r="2" />
  </svg>
)

export default function HomeFeed() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const listRef = useCardReveal<HTMLUListElement>(activeTab)

  const feedQuery = useReviewsFeed({ sort: SORT_MAP[activeTab] })
  const orgsQuery = useOrganizations({ limit: 100 })

  const reviews = feedQuery.data?.pages.flatMap(p => p.data) ?? []
  const orgNameMap = useMemo(
    () => Object.fromEntries((orgsQuery.data?.data ?? []).map(o => [o.id, o.name])),
    [orgsQuery.data]
  )

  return (
    <section aria-label="Review feed">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-0.5 bg-elevated rounded-full p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-accent text-white' : 'text-muted hover:text-primary'
              }`}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="p-2 text-muted hover:text-primary transition-colors" aria-label="Filter options">
          <FilterIcon />
        </button>
      </div>

      {feedQuery.isLoading ? (
        <div className="flex justify-center py-20">
          <span className="text-muted text-sm">Loading…</span>
        </div>
      ) : feedQuery.isError ? (
        <div className="flex justify-center py-20">
          <span className="text-muted text-sm">Failed to load reviews.</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-base font-medium text-primary">No reviews yet</p>
          <p className="text-sm text-muted mt-1">Be the first to share your experience</p>
        </div>
      ) : (
        <>
          <ul ref={listRef} className="space-y-3">
            {reviews.map(review => (
              <li key={review.id} data-card>
                <ReviewCard review={review} orgName={orgNameMap[review.orgId] ?? 'Unknown'} />
              </li>
            ))}
          </ul>
          {feedQuery.hasNextPage && (
            <button
              onClick={() => feedQuery.fetchNextPage()}
              disabled={feedQuery.isFetchingNextPage}
              className="w-full mt-4 py-3 text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
            >
              {feedQuery.isFetchingNextPage ? 'Loading…' : 'Load more'}
            </button>
          )}
        </>
      )}
    </section>
  )
}
