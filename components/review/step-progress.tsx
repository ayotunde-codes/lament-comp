import type { ReviewStep } from '@/hooks/use-review-flow'

interface StepProgressProps {
  step: ReviewStep
  onBack: () => void
}

const STEP_INDEX: Record<ReviewStep, number> = { compose: 1, seal: 2 }
const STEP_LABEL: Record<ReviewStep, string> = { compose: 'Compose', seal: 'Seal' }
const TOTAL = 2

export default function StepProgress({ step, onBack }: StepProgressProps) {
  const idx = STEP_INDEX[step]
  const pct = Math.round(((idx - 1) / (TOTAL - 1)) * 100)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full border border-border text-muted hover:text-primary hover:border-accent/60 transition-colors"
          aria-label="Go back"
        >
          ←
        </button>
        <div className="flex-1 h-1 bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted text-center tabular-nums">
        Step {idx} of {TOTAL} · {STEP_LABEL[step]}
      </p>
    </div>
  )
}
