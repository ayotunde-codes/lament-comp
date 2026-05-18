'use client'

import Link from 'next/link'

export default function OrgDetailError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <p className="text-5xl">🫖</p>
      <p className="font-display text-xl font-semibold text-primary tracking-tight">Something spilled over.</p>
      <p className="text-sm text-muted">We couldn&apos;t load this company&apos;s spills.</p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-canvas text-sm font-semibold transition-colors"
        >
          Try again
        </button>
        <Link
          href="/organizations"
          className="px-5 py-2.5 bg-elevated border border-border rounded-xl text-muted hover:text-primary text-sm font-medium transition-colors"
        >
          Back to companies
        </Link>
      </div>
    </div>
  )
}
