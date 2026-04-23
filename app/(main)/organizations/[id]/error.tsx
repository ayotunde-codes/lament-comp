'use client'

import Link from 'next/link'

export default function OrgDetailError() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <p className="text-lg font-semibold text-primary">Something went wrong</p>
      <p className="text-sm text-muted">We couldn&apos;t load this organization&apos;s reviews.</p>
      <Link
        href="/organizations"
        className="mt-2 px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
      >
        Back to Organizations
      </Link>
    </div>
  )
}
