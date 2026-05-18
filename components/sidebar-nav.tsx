'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BuildingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/organizations', label: 'Companies', Icon: BuildingsIcon },
  { href: '/review', label: 'Drop a Spill', Icon: PenIcon },
] as const

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[220px] bg-canvas border-r border-border z-40 px-4 py-6">
      <Link href="/" className="mb-8 block leading-none">
        <span className="font-display text-2xl font-semibold text-primary tracking-tight">
          Cooperate <em className="not-italic text-accent">Tea</em>
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mt-1.5">
          The anonymous voice
        </span>
      </Link>

      <nav aria-label="Sidebar navigation" className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
              aria-current={active ? 'page' : undefined}
            >
              {/* Sliding background pill */}
              {active && (
                <motion.span
                  layoutId="sidebar-nav-active"
                  className="absolute inset-0 rounded-lg bg-accent/10 border-l-2 border-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <motion.span
                animate={{ color: active ? 'var(--color-accent)' : 'var(--color-muted)' }}
                whileHover={{ color: active ? 'var(--color-accent)' : 'var(--color-primary)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center gap-3 z-10"
              >
                <Icon />
                {label}
              </motion.span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted border border-border rounded-full px-3 py-2">
        <ShieldIcon />
        <span>Sealed &amp; anonymous</span>
      </div>
    </aside>
  )
}
