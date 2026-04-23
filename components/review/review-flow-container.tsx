'use client'
import { useRouter } from 'next/navigation'
import { useReviewFlow } from '@/hooks/use-review-flow'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import StepProgress from './step-progress'
import StepSelectOrg from './step-select-org'
import StepTitle from './step-title'
import StepBody from './step-body'
import StepExtras from './step-extras'
import StepConfirm from './step-confirm'

export default function ReviewFlowContainer() {
  const flow = useReviewFlow()
  const isDesktop = useIsDesktop()
  const router = useRouter()

  function handleBack() {
    if (flow.step === 1) router.back()
    else flow.goBack()
  }

  function renderStep() {
    switch (flow.step) {
      case 1: return <StepSelectOrg formData={flow.formData} setField={flow.setField} onNext={flow.goNext} />
      case 2: return <StepTitle formData={flow.formData} setField={flow.setField} onNext={flow.goNext} />
      case 3: return <StepBody formData={flow.formData} setField={flow.setField} onNext={flow.goNext} />
      case 4: return <StepExtras formData={flow.formData} setField={flow.setField} onNext={flow.goNext} />
      default: return <StepConfirm formData={flow.formData} identity={flow.identity} onRandomize={flow.randomizeIdentity} onSubmit={flow.submit} isSubmitted={flow.isSubmitted} />
    }
  }

  const formContent = (
    <div className="flex flex-col gap-6 p-6 pb-10">
      {!flow.isSubmitted && <StepProgress step={flow.step} onBack={handleBack} />}
      {renderStep()}
    </div>
  )

  if (isDesktop) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Write a review"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => router.back()} />
        <div className="relative bg-canvas border border-border rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto z-10 shadow-2xl">
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-5 text-muted hover:text-primary transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          {formContent}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-screen bg-canvas">
      {formContent}
    </div>
  )
}
