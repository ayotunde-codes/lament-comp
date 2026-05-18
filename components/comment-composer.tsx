'use client'

import { useState } from 'react'
import { generateIdentity } from '@/lib/avatar'
import Avatar from './avatar'
import { usePostComment } from '@/services/comments/queries'

const MAX_CHARS = 280

interface CommentComposerProps {
  reviewId: string
  onDone: () => void
}

export default function CommentComposer({ reviewId, onDone }: CommentComposerProps) {
  const [body, setBody] = useState('')
  const [identity] = useState(() => generateIdentity())
  const { mutate, isPending } = usePostComment(reviewId)

  const remaining = MAX_CHARS - body.length
  const canSubmit = body.trim().length > 0 && !isPending

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    mutate(
      { body: body.trim() },
      {
        onSuccess: () => {
          setBody('')
          onDone()
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2.5 pt-3 border-t border-border"
      aria-label="Post a comment"
    >
      <Avatar seed={identity.username} size="sm" className="mt-1 shrink-0" />

      <div className="flex-1 min-w-0 space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted leading-none">
          Posting as <span className="text-accent">{identity.username}</span> in this thread.
        </p>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Chime in. 280 characters."
          rows={2}
          className="w-full bg-elevated border border-border rounded-xl px-3 py-2 text-sm text-primary placeholder:text-muted resize-none focus:outline-none focus:border-accent/60 transition-colors leading-relaxed"
          aria-label="Comment text"
          disabled={isPending}
        />

        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-[10px] tabular-nums ${
              remaining < 20 ? 'text-danger' : 'text-muted'
            }`}
            aria-live="polite"
          >
            {remaining}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDone}
              className="text-xs text-muted hover:text-primary transition-colors px-2 py-1"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-1.5 rounded-full bg-accent text-canvas text-xs font-semibold transition-colors hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? 'Posting…' : 'Reply'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
