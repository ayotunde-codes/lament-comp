'use client'

import { useState, useMemo } from 'react'
import { useReviewsFeed } from '@/services/reviews/queries'
import { useOrganizations } from '@/services/organizations/queries'
import ReviewCard from './review-card'
import { useCardReveal } from '@/hooks/use-card-reveal'
import { REVIEW_TAGS } from '@/constants/review-tags'
import type { ListReviewsParams } from '@/services/reviews/types'
import { motion } from 'framer-motion'

type Tab = 'all' | 'trending' | 'latest'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Hot Brews' },
  { id: 'latest', label: 'Fresh Pours' },
]

const SORT_MAP: Record<Tab, ListReviewsParams['sort']> = {
  all: undefined,
  trending: 'top',
  latest: 'latest',
}

export default function HomeFeed() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined)

  const listRef = useCardReveal<HTMLUListElement>(`${activeTab}-${activeTag}`)

  const feedQuery = useReviewsFeed({ sort: SORT_MAP[activeTab], tag: activeTag })
  const orgsQuery = useOrganizations({ limit: 100 })

  const reviews = feedQuery.data?.pages.flatMap(p => p.data) ?? []
  const orgNameMap = useMemo(
    () => Object.fromEntries((orgsQuery.data?.data ?? []).map(o => [o.id, o.name])),
    [orgsQuery.data]
  )

  function handleTagClick(tag: string) {
    setActiveTag(prev => prev === tag ? undefined : tag)
  }

  return (
    <section aria-label="Spill feed">

      {/* Tabs row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-0.5 bg-elevated rounded-full p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              aria-pressed={activeTab === tab.id}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="feed-tab-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${activeTab === tab.id ? 'text-canvas' : 'text-muted'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        {activeTag && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={() => setActiveTag(undefined)}
            className="text-xs text-accent hover:underline"
          >
            Clear filter
          </motion.button>
        )}
      </div>

      {/* Tag filter chips */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-5"
        style={{ scrollbarWidth: 'none' }}
        role="group"
        aria-label="Filter feed by topic"
      >
        {REVIEW_TAGS.map(tag => (
          <motion.button
            key={tag}
            onClick={() => handleTagClick(tag)}
            aria-pressed={activeTag === tag}
            whileTap={{ scale: 0.92 }}
            animate={{
              backgroundColor: activeTag === tag ? 'rgba(111,168,142,0.15)' : 'transparent',
            }}
            transition={{ duration: 0.15 }}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              activeTag === tag
                ? 'border-accent/50 text-accent'
                : 'border-border text-muted hover:border-accent/40 hover:text-primary'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      {feedQuery.isLoading ? (
        <div className="flex justify-center py-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Steeping…</span>
        </div>
      ) : feedQuery.isError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
          <p className="text-3xl">🫖</p>
          <p className="text-sm text-primary">We couldn&apos;t fetch the tea.</p>
          <p className="text-xs text-muted">Try again in a moment.</p>
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
              <p className="font-display text-lg font-semibold text-primary">The kettle&apos;s quiet.</p>
              <p className="text-sm text-muted mt-1">Be the first to spill.</p>
            </>
          )}
        </div>
      ) : (
        <>
          <ul ref={listRef} className="space-y-3">
            {reviews.map(review => (
              <li key={review.id} data-card>
                <ReviewCard
                  review={review}
                  orgName={orgNameMap[review.orgId] ?? 'Unknown'}
                  onTagClick={handleTagClick}
                  activeTag={activeTag}
                />
              </li>
            ))}
          </ul>
          {feedQuery.hasNextPage && (
            <motion.button
              onClick={() => feedQuery.fetchNextPage()}
              disabled={feedQuery.isFetchingNextPage}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-4 py-3 text-sm text-muted hover:text-primary transition-colors disabled:opacity-40"
            >
              {feedQuery.isFetchingNextPage ? 'Steeping…' : 'Load more'}
            </motion.button>
          )}
        </>
      )}
    </section>
  )
}
