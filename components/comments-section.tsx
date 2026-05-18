'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useComments } from '@/services/comments/queries'
import CommentCard from './comment-card'
import CommentComposer from './comment-composer'

interface CommentsSectionProps {
  reviewId: string
  onClose: () => void
}

export default function CommentsSection({ reviewId, onClose }: CommentsSectionProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useComments(reviewId)

  const comments = data?.pages.flatMap((p) => p.data) ?? []

  // Staggered entrance for comments when they first load
  useEffect(() => {
    const container = listRef.current
    if (!container || comments.length === 0) return
    const items = container.querySelectorAll('[data-comment]')
    if (items.length === 0) return
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 8,
        stagger: 0.04,
        duration: 0.3,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      })
    })
    return () => ctx.revert()
  // Only animate on first load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <section
      className="mt-3 space-y-3"
      aria-label="Comments"
    >
      {isLoading ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted py-2">
          Steeping…
        </p>
      ) : isError ? (
        <p className="text-xs text-muted py-2">Couldn&apos;t load the thread. Try again.</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-muted italic py-1">
          No replies yet. Be the first to chime in.
        </p>
      ) : (
        <div ref={listRef} className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} data-comment>
              <CommentCard comment={comment} />
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="text-xs text-muted hover:text-primary transition-colors disabled:opacity-40"
        >
          {isFetchingNextPage ? 'Steeping…' : 'Load more replies'}
        </button>
      )}

      <CommentComposer reviewId={reviewId} onDone={onClose} />
    </section>
  )
}
