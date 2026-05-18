'use client'

import { useState } from 'react'
import type { Review } from '@/types'
import StarRating from './star-rating'
import Avatar from './avatar'
import ReactionsBar from './reactions-bar'
import CommentsSection from './comments-section'
import { formatTimeAgo } from '@/lib/format-time'
import { ROLE_LABEL, TENURE_LABEL, STATUS_LABEL } from '@/constants/trust-signals'
import type { RoleValue, TenureValue, StatusValue } from '@/constants/trust-signals'
import { motion, AnimatePresence } from 'framer-motion'

interface ReviewCardProps {
  review: Review
  orgName: string
  hideOrgName?: boolean
  onTagClick?: (tag: string) => void
  activeTag?: string
}

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

const ChimeIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export default function ReviewCard({
  review,
  orgName,
  hideOrgName = false,
  onTagClick,
  activeTag,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const commentCount = review.commentCount ?? 0
  const tags = review.tags ?? []

  return (
    <motion.article
      className="bg-surface border border-border rounded-2xl p-5 space-y-3"
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >

      {/* Row 1: avatar · handle / timestamp · org pill */}
      <div className="flex items-start gap-3">
        <Avatar seed={review.username} size="sm" className="mt-0.5" />
        <div className="flex-1 flex items-start justify-between min-w-0 gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary leading-tight truncate">
              Anon Barista — {review.username}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mt-1">{formatTimeAgo(review.createdAt)}</p>
            {(review.role || review.tenure || review.status) && (
              <p className="text-[11px] text-muted mt-0.5">
                {[
                  review.role ? ROLE_LABEL[review.role as RoleValue] : null,
                  review.tenure ? TENURE_LABEL[review.tenure as TenureValue] : null,
                  review.status ? STATUS_LABEL[review.status as StatusValue] : null,
                ].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {!hideOrgName && (
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-accent border border-accent/40 rounded-full px-2 py-0.5">
                {orgName}
              </span>
            )}
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Row 2: heading + body (left) · emoji (right) */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-display text-lg font-semibold text-primary leading-snug tracking-tight">{review.heading}</h3>
          <p className={`text-sm text-primary/90 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {review.body}
          </p>
          {review.body.length > 130 && (
            <motion.button
              onClick={() => setExpanded(e => !e)}
              whileTap={{ scale: 0.96 }}
              className="text-xs text-accent hover:underline"
            >
              {expanded ? 'Read less' : 'Read more'}
            </motion.button>
          )}
        </div>
        {review.emoji && (
          <motion.div
            className="text-3xl shrink-0 leading-none mt-1"
            aria-label={`Reaction: ${review.emoji}`}
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          >
            {review.emoji}
          </motion.div>
        )}
      </div>

      {/* Row 2b: tag pills */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Topics">
          {tags.map(tag => (
            <span key={tag} role="listitem">
              {onTagClick ? (
                <motion.button
                  type="button"
                  onClick={() => onTagClick(tag)}
                  whileTap={{ scale: 0.9 }}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                    activeTag === tag
                      ? 'bg-accent/15 border-accent/50 text-accent'
                      : 'border-border text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                  aria-pressed={activeTag === tag}
                  aria-label={`Filter by ${tag}`}
                >
                  {tag}
                </motion.button>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-muted">
                  {tag}
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Row 3: reactions + secondary actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <ReactionsBar reviewId={review.id} counts={review.reactionCounts} />
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <motion.button
            onClick={() => setShowComments(v => !v)}
            whileTap={{ scale: 0.88 }}
            animate={{ color: showComments ? 'var(--color-accent)' : 'var(--color-muted)' }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-xs font-medium"
            aria-expanded={showComments}
            aria-label={showComments ? 'Hide replies' : `${commentCount} ${commentCount === 1 ? 'reply' : 'replies'} — chime in`}
          >
            <ChimeIcon />
            <span className="tabular-nums">
              {commentCount > 0 ? commentCount : 'Chime in'}
            </span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ color: 'var(--color-primary)' }}
            className="text-muted transition-colors"
            aria-label="Share"
          >
            <ShareIcon />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ color: 'var(--color-primary)' }}
            className="text-muted transition-colors"
            aria-label="Bookmark"
          >
            <BookmarkIcon />
          </motion.button>
        </div>
      </div>

      {/* Row 4: comments thread (lazy, spring entrance) */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ overflow: 'hidden' }}
          >
            <CommentsSection
              reviewId={review.id}
              onClose={() => setShowComments(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.article>
  )
}
