'use client'

import Link from 'next/link'
import { useOrganization } from '@/services/organizations/queries'
import StarRating from './star-rating'
import OrgReviewsList from './org-reviews-list'
import VibeChecksPanel from './vibe-checks-panel'
import { motion } from 'framer-motion'

// Brand-aligned logo palette, matching org-card.tsx.
const LOGO_COLORS = [
  '#6FA88E', '#C7763E', '#B5A06E', '#9B7B5C',
  '#7FB89A', '#C58B7E', '#8FA5B8', '#A88562',
]

function getLogoColor(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return LOGO_COLORS[hash % LOGO_COLORS.length]
}

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

interface Props {
  id: string
}

export default function OrgDetailView({ id }: Props) {
  const { data: org, isLoading, isError } = useOrganization(id)

  if (isLoading) {
    return <div className="flex justify-center py-20"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Steeping…</span></div>
  }

  if (isError || !org) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
        <p className="text-4xl">🫖</p>
        <p className="font-display text-lg font-semibold text-primary">We couldn&apos;t find that company.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-32">

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="flex items-center justify-between"
      >
        <motion.div whileTap={{ x: -3 }}>
          <Link href="/organizations" className="flex items-center gap-1 text-muted hover:text-primary transition-colors -ml-1" aria-label="Back to companies">
            <BackIcon />
          </Link>
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          type="button"
          aria-label="Share this company"
          className="text-muted hover:text-primary transition-colors p-1"
        >
          <ShareIcon />
        </motion.button>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.06 }}
        className="flex items-center gap-4"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-canvas font-display text-xl font-semibold shrink-0"
          style={{ backgroundColor: getLogoColor(org.id) }}
          aria-hidden="true"
        >
          {org.logo}
        </motion.div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary leading-tight tracking-tight">{org.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-star font-semibold text-base tabular-nums">{org.averageRating.toFixed(1)}</span>
            <StarRating rating={org.averageRating} size="md" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-1 tabular-nums">{org.reviewCount} {org.reviewCount === 1 ? 'spill' : 'spills'}</p>
        </div>
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.12 }}>
        <VibeChecksPanel orgId={org.id} />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.18 }}>
        <OrgReviewsList orgId={org.id} orgName={org.name} />
      </motion.div>

      <div className="fixed bottom-16 md:bottom-6 left-0 md:left-[220px] xl:right-[280px] right-0 px-4 z-30">
        <div className="max-w-2xl mx-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link href="/review" className="block w-full py-4 text-center bg-accent hover:bg-accent-hover rounded-2xl text-canvas font-semibold text-sm transition-colors">
              Drop a Spill
            </Link>
          </motion.div>
        </div>
      </div>

    </div>
  )
}
