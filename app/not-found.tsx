import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found — Cooperate Tea',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-display text-6xl font-semibold text-accent leading-none">404</p>
        <p className="font-display text-xl font-semibold text-primary tracking-tight">Couldn&apos;t find that page.</p>
        <p className="text-sm text-muted max-w-xs">
          The company or page you&apos;re looking for might have moved — or never existed.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-canvas text-sm font-semibold transition-colors"
        >
          Back to the feed
        </Link>
      </div>
    </div>
  )
}
