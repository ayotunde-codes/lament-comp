'use client'
import type { ReviewFormData } from '@/hooks/use-review-flow'

const MAX_CHARS = 80

interface Props {
  formData: ReviewFormData
  setField: <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => void
  onNext: () => void
}

export default function StepTitle({ formData, setField, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-primary">Write Your Review</h2>
        <p className="text-sm text-muted mt-1">Share your experience anonymously</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="review-title" className="text-sm font-medium text-primary">
            Review Title
          </label>
          <span className="text-xs text-muted tabular-nums">
            {formData.title.length}/{MAX_CHARS}
          </span>
        </div>
        <input
          id="review-title"
          type="text"
          value={formData.title}
          onChange={e => e.target.value.length <= MAX_CHARS && setField('title', e.target.value)}
          placeholder="e.g. Great work environment"
          className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
          autoFocus
        />
      </div>

      <button
        onClick={onNext}
        disabled={!formData.title.trim()}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
