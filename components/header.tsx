import Link from 'next/link'

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-canvas border-b border-border">
      <Link href="/" className="text-lg font-bold text-accent tracking-tight">
        Lament
      </Link>
      <button
        type="button"
        aria-label="Notifications"
        className="text-muted hover:text-primary transition-colors p-1"
      >
        <BellIcon />
      </button>
    </header>
  )
}
