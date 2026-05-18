'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0E0B07] text-[#F5EBDA] flex items-center justify-center antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <p className="text-5xl">🫖</p>
          <p className="text-xl font-semibold">Something spilled over.</p>
          <p className="text-sm text-[#A89886]">An unexpected error happened. We&apos;ll boil a fresh pot.</p>
          <button
            onClick={reset}
            className="mt-2 px-6 py-2.5 bg-[#6FA88E] hover:bg-[#82B89E] rounded-xl text-[#0E0B07] text-sm font-semibold transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
