interface StepProgressProps {
  step: number
  total?: number
  onBack: () => void
}

export default function StepProgress({ step, total = 5, onBack }: StepProgressProps) {
  const pct = Math.round(((step - 1) / (total - 1)) * 100)

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
      <p className="text-xs text-muted text-center">Step {step} of {total}</p>
    </div>
  )
}
