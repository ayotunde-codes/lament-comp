'use client'

import { useVibeChecks } from '@/services/organizations/queries'
import { motion } from 'framer-motion'

interface Props {
  orgId: string
}

export default function VibeChecksPanel({ orgId }: Props) {
  const { data: vibes, isLoading } = useVibeChecks(orgId)

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5">
        <div className="flex justify-center py-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Reading the leaves…</span>
        </div>
      </div>
    )
  }

  if (!vibes || vibes.length === 0) return null

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
      <div>
        <h2 className="font-display text-base font-semibold text-primary leading-tight">Vibe Checks</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-1">
          Avg rating by topic
        </p>
      </div>

      <ul className="space-y-3">
        {vibes.map((vibe, i) => {
          const pct = Math.round((vibe.avgRating / 5) * 100)
          const isWarm = vibe.avgRating >= 3.5
          return (
            <motion.li
              key={vibe.tag}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{vibe.tag}</span>
                <span className="font-mono text-[11px] text-muted tabular-nums">
                  {vibe.avgRating.toFixed(1)}{' '}
                  <span className="text-muted/60">/ 5 · {vibe.count} {vibe.count === 1 ? 'spill' : 'spills'}</span>
                </span>
              </div>
              {/* Bar track */}
              <div className="h-1.5 w-full rounded-full bg-elevated overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: isWarm ? 'var(--color-accent)' : 'var(--color-danger)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
