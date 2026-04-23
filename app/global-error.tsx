'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0A14] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <p className="text-5xl">⚠️</p>
          <p className="text-xl font-semibold">Something went wrong</p>
          <p className="text-sm text-[#8B8BA7]">An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            className="mt-2 px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl text-white text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
