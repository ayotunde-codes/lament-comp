'use client'

import Link from 'next/link'

export default function ReviewError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <p className="text-5xl">✍️</p>
      <p className="text-lg font-semibold text-primary">Something went wrong</p>
      <p className="text-sm text-muted">We hit an error loading the review form. Try again.</p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-elevated border border-border rounded-xl text-muted hover:text-primary text-sm font-medium transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
