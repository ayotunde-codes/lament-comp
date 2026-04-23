'use client'

import { useState, useMemo } from 'react'
import type { Review } from '@/types'
import ReviewCard from './review-card'
import { useCardReveal } from '@/hooks/use-card-reveal'

type Tab = 'all' | 'trending' | 'latest'

interface HomeFeedProps {
  reviews: Review[]
  orgNameMap: Record<string, string>
}

const FilterIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="4" x2="14" y2="4" /><line x1="10" y1="4" x2="3" y2="4" />
    <line x1="21" y1="12" x2="12" y2="12" /><line x1="8" y1="12" x2="3" y2="12" />
    <line x1="21" y1="20" x2="16" y2="20" /><line x1="12" y1="20" x2="3" y2="20" />
    <circle cx="12" cy="4" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="14" cy="20" r="2" />
  </svg>
)

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'latest', label: 'Latest' },
]

export default function HomeFeed({ reviews, orgNameMap }: HomeFeedProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const listRef = useCardReveal<HTMLUListElement>(activeTab)

  const sorted = useMemo(() => {
    if (activeTab === 'trending') return [...reviews].sort((a, b) => b.likes - a.likes)
    return reviews
  }, [reviews, activeTab])

  return (
    <section aria-label="Review feed">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-0.5 bg-elevated rounded-full p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-primary'
              }`}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          className="p-2 text-muted hover:text-primary transition-colors"
          aria-label="Filter options"
        >
          <FilterIcon />
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-base font-medium text-primary">No reviews yet</p>
          <p className="text-sm text-muted mt-1">Be the first to share your experience</p>
        </div>
      ) : (
        <ul ref={listRef} className="space-y-3">
          {sorted.map(review => (
            <li key={review.id} data-card>
              <ReviewCard review={review} orgName={orgNameMap[review.orgId] ?? 'Unknown'} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
