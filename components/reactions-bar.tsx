'use client'

import { useState } from 'react'
import { REACTIONS, type ReactionType, type ReactionCounts } from '@/types'
import { useReactToReview, useUndoReaction } from '@/services/reactions/queries'
import { motion, AnimatePresence } from 'framer-motion'

interface ReactionsBarProps {
  reviewId: string
  counts: ReactionCounts
}

export default function ReactionsBar({ reviewId, counts }: ReactionsBarProps) {
  const [active, setActive] = useState<ReactionType | null>(null)
  const { mutate: react } = useReactToReview()
  const { mutate: undo } = useUndoReaction()

  function handleClick(type: ReactionType) {
    if (active === type) {
      undo({ reviewId, previousType: type })
      setActive(null)
      return
    }
    react({ reviewId, type, previousType: active })
    setActive(type)
  }

  return (
    <div className="flex items-center gap-1 flex-wrap" role="group" aria-label="React to this spill">
      {REACTIONS.map(({ type, emoji, label, ariaSuffix }) => {
        const isActive = active === type
        const count = counts[type] ?? 0
        return (
          <motion.button
            key={type}
            type="button"
            onClick={() => handleClick(type)}
            whileTap={{ scale: 0.75 }}
            animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
              isActive
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-transparent text-muted hover:text-primary hover:bg-elevated'
            }`}
            aria-label={`${label} · ${count} ${count === 1 ? 'person' : 'people'} — ${ariaSuffix}`}
            aria-pressed={isActive}
          >
            <motion.span
              className="text-sm leading-none"
              animate={isActive ? { rotate: [0, -15, 15, 0] } : { rotate: 0 }}
              transition={{ duration: 0.35 }}
            >
              {emoji}
            </motion.span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="tabular-nums"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
