import Link from 'next/link'
import type { Organization } from '@/types'
import StarRating from './star-rating'
import { motion } from 'framer-motion'

// Brand-aligned logo palette (warm + one matcha), all readable with dark text.
const LOGO_COLORS = [
  '#6FA88E', // matcha
  '#C7763E', // terracotta
  '#B5A06E', // ochre
  '#9B7B5C', // taupe
  '#7FB89A', // sage
  '#C58B7E', // dusty rose
  '#8FA5B8', // slate
  '#A88562', // copper
]

function getLogoColor(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return LOGO_COLORS[hash % LOGO_COLORS.length]
}

interface OrgCardProps {
  org: Organization
}

export default function OrgCard({ org }: OrgCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <Link
        href={`/organizations/${org.id}`}
        className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3 hover:border-accent/50 transition-colors block"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-canvas font-display text-lg font-semibold shrink-0"
          style={{ backgroundColor: getLogoColor(org.id) }}
          aria-hidden="true"
        >
          {org.logo ?? org.name[0].toUpperCase()}
        </div>
        <div>
          <p className="text-primary font-semibold text-sm leading-snug">{org.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-star text-xs font-semibold tabular-nums">{org.averageRating.toFixed(1)}</span>
            <StarRating rating={org.averageRating} size="sm" />
          </div>
          <p className="text-muted text-xs mt-0.5 tabular-nums">{org.reviewCount} {org.reviewCount === 1 ? 'spill' : 'spills'}</p>
        </div>
      </Link>
    </motion.div>
  )
}
