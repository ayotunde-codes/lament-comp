'use client'
import { useRouter } from 'next/navigation'
import StarRating from '@/components/star-rating'
import Avatar from '@/components/avatar'
import type { ReviewFormData, Identity } from '@/hooks/use-review-flow'

interface Props {
  formData: ReviewFormData
  identity: Identity
  onRandomize: () => void
  onSubmit: () => void
  isSubmitted: boolean
}

export default function StepConfirm({ formData, identity, onRandomize, onSubmit, isSubmitted }: Props) {
  const router = useRouter()

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-positive/20 border border-positive/40 flex items-center justify-center text-3xl">
          ✓
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">Review Posted!</h2>
          <p className="text-sm text-muted mt-1">Your anonymous review is now live.</p>
          <p className="text-xs text-muted mt-0.5">No one knows it was you.</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-2 bg-accent text-white font-semibold px-8 py-3 rounded-xl hover:bg-accent-hover transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-primary">Review Preview</h2>
        <p className="text-sm text-muted mt-1">This is how your review will appear</p>
      </div>

      <div className="bg-elevated border border-border rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar seed={identity.username} size="md" />
          <div>
            <p className="text-sm font-semibold text-primary">{identity.username}</p>
            <p className="text-xs text-muted">Your anonymous identity</p>
          </div>
        </div>
        <button
          onClick={onRandomize}
          className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
          aria-label="Get a new random identity"
        >
          ✦ Randomize
        </button>
      </div>

      <div className="bg-elevated border border-border rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar seed={identity.username} size="sm" />
            <div>
              <p className="text-xs font-medium text-primary">{identity.username}</p>
              <p className="text-xs text-muted">Just now</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <p className="text-xs text-muted font-medium">{formData.orgName}</p>
            <StarRating rating={formData.rating} size="sm" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{formData.title}</p>
          <p className="text-xs text-muted mt-1 line-clamp-4">{formData.body}</p>
        </div>
        {formData.emoji && <p className="text-2xl">{formData.emoji}</p>}
      </div>

      <div className="flex items-center gap-2 bg-elevated border border-border rounded-xl px-4 py-3">
        <span className="text-lg">🔒</span>
        <p className="text-xs text-muted">100% Anonymous. No sign up. No tracking. No one knows it's you.</p>
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors"
      >
        Post Review Anonymously
      </button>
    </div>
  )
}
