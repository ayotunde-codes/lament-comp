'use client'
import type { ReviewFormData } from '@/hooks/use-review-flow'

const MAX_CHARS = 1000

interface Props {
  formData: ReviewFormData
  setField: <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => void
  onNext: () => void
}

export default function StepBody({ formData, setField, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-primary">Write Your Review</h2>
        <p className="text-sm text-muted mt-1">Share your experience anonymously</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="review-body" className="text-sm font-medium text-primary">
            Your Review
          </label>
          <span className="text-xs text-muted tabular-nums">
            {formData.body.length}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          id="review-body"
          value={formData.body}
          onChange={e => e.target.value.length <= MAX_CHARS && setField('body', e.target.value)}
          placeholder="The team is supportive and management listens to feedback. Very good place to grow your career."
          rows={6}
          className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors resize-none"
          autoFocus
        />
      </div>

      <button
        onClick={onNext}
        disabled={!formData.body.trim()}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
