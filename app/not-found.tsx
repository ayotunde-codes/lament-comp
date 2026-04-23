import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found — Lament',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-6xl font-bold text-accent">404</p>
        <p className="text-xl font-semibold text-primary">Page not found</p>
        <p className="text-sm text-muted max-w-xs">
          The organization or page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
