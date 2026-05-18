'use client'
import { useRouter } from 'next/navigation'
import StarRating from '@/components/star-rating'
import Avatar from '@/components/avatar'
import { deriveHeadline } from '@/hooks/use-review-flow'
import type { ReviewFormData, Identity } from '@/hooks/use-review-flow'
import { motion } from 'framer-motion'

interface Props {
  formData: ReviewFormData
  identity: Identity
  onRandomize: () => void
  onSubmit: () => void
  onBackToEdit: () => void
  isSubmitted: boolean
}

export default function StepSeal({ formData, identity, onRandomize, onSubmit, onBackToEdit, isSubmitted }: Props) {
  const router = useRouter()
  const headline = deriveHeadline(formData.body)

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
          className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-3xl text-accent"
        >
          ✓
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="font-display text-2xl font-semibold text-primary tracking-tight leading-tight">Sealed and poured.</h2>
          <p className="text-sm text-muted mt-1">Your spill is on the feed.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-2">No name. No trace.</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push('/')}
          className="mt-2 bg-accent text-canvas font-semibold px-8 py-3 rounded-xl hover:bg-accent-hover transition-colors"
        >
          Back to feed
        </motion.button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary tracking-tight leading-tight">Look it over.</h2>
        <p className="text-sm text-muted mt-1">This is how your spill will show up.</p>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-elevated border border-border rounded-2xl p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar seed={identity.username} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary truncate">Anon Barista — {identity.username}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mt-0.5">Just now</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-accent truncate max-w-[140px]">{formData.orgName}</p>
            <StarRating rating={formData.rating} size="sm" />
          </div>
        </div>
        <div>
          {headline && <p className="font-display text-base font-semibold text-primary leading-snug">{headline}</p>}
          <p className="text-sm text-primary/90 mt-1 line-clamp-5 leading-relaxed whitespace-pre-wrap">{formData.body}</p>
        </div>
        {formData.emoji && <p className="text-2xl">{formData.emoji}</p>}
      </motion.article>

      <div className="flex items-center justify-between bg-elevated border border-border rounded-xl px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-primary truncate">Posting as <strong>Anon Barista — {identity.username}</strong></p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-1">Sealed. No name. No trace.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          onClick={onRandomize}
          className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors shrink-0 ml-3"
          aria-label="Re-roll handle"
        >
          ✦ Re-roll
        </motion.button>
      </div>

      <div className="flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          className="w-full bg-accent text-canvas font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors"
        >
          Pour it out
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onBackToEdit}
          className="w-full text-muted hover:text-primary text-sm py-2 transition-colors"
        >
          Back to edit
        </motion.button>
      </div>
    </div>
  )
}
