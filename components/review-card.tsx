'use client'

import { useState } from 'react'
import type { Review } from '@/types'
import StarRating from './star-rating'
import Avatar from './avatar'
import { formatTimeAgo } from '@/lib/format-time'

interface ReviewCardProps {
  review: Review
  orgName: string
  hideOrgName?: boolean
}

const ThumbUp = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
)

const ThumbDown = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
    <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
  </svg>
)

const ShareIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)

const BookmarkIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

export default function ReviewCard({ review, orgName, hideOrgName = false }: ReviewCardProps) {
  const [likes, setLikes] = useState(review.likes)
  const [dislikes, setDislikes] = useState(review.dislikes)
  const [voted, setVoted] = useState<'like' | 'dislike' | null>(null)
  const [expanded, setExpanded] = useState(false)

  function handleLike() {
    if (voted === 'like') { setLikes(l => l - 1); setVoted(null); return }
    if (voted === 'dislike') setDislikes(d => d - 1)
    setLikes(l => l + 1)
    setVoted('like')
  }

  function handleDislike() {
    if (voted === 'dislike') { setDislikes(d => d - 1); setVoted(null); return }
    if (voted === 'like') setLikes(l => l - 1)
    setDislikes(d => d + 1)
    setVoted('dislike')
  }

  return (
    <article className="bg-surface border border-border rounded-2xl p-4 space-y-3">

      {/* Row 1: avatar · username/timestamp · org+rating */}
      <div className="flex items-start gap-3">
        <Avatar seed={review.username} size="sm" className="mt-0.5" />
        <div className="flex-1 flex items-start justify-between min-w-0 gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary leading-tight truncate">{review.username}</p>
            <p className="text-xs text-muted mt-0.5">{formatTimeAgo(review.timestamp)}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {!hideOrgName && <span className="text-xs text-star font-medium">{orgName}</span>}
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Row 2: heading + body (left) · emoji (right) */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-base font-bold text-primary leading-snug">{review.heading}</h3>
          <p className={`text-sm text-muted leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {review.body}
          </p>
          {review.body.length > 130 && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-xs text-accent hover:underline"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        {review.emoji && (
          <div className="text-3xl shrink-0 leading-none mt-1" aria-label={`Reaction: ${review.emoji}`}>
            {review.emoji}
          </div>
        )}
      </div>

      {/* Row 3: actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${voted === 'like' ? 'text-positive' : 'text-muted hover:text-positive'}`}
          aria-label="Like this review"
        >
          <ThumbUp />{likes}
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${voted === 'dislike' ? 'text-danger' : 'text-muted hover:text-danger'}`}
          aria-label="Dislike this review"
        >
          <ThumbDown />{dislikes}
        </button>
        <div className="flex items-center gap-3 ml-auto">
          <button className="text-muted hover:text-primary transition-colors" aria-label="Share review">
            <ShareIcon />
          </button>
          <button className="text-muted hover:text-primary transition-colors" aria-label="Bookmark review">
            <BookmarkIcon />
          </button>
        </div>
      </div>

    </article>
  )
}
