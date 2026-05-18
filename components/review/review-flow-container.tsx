'use client'
import { useRouter } from 'next/navigation'
import { useReviewFlow } from '@/hooks/use-review-flow'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import StepProgress from './step-progress'
import StepCompose from './step-compose'
import StepSeal from './step-seal'
import { motion, AnimatePresence } from 'framer-motion'

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ReviewFlowContainer() {
  const flow = useReviewFlow()
  const isDesktop = useIsDesktop()
  const router = useRouter()

  // direction: 1 = forward (compose→seal), -1 = back (seal→compose)
  const dir = flow.step === 'seal' ? 1 : -1

  function handleBack() {
    if (flow.step === 'compose') router.back()
    else flow.goToCompose()
  }

  const formContent = (
    <div className="flex flex-col gap-6 p-6 pb-10">
      {!flow.isSubmitted && <StepProgress step={flow.step} onBack={handleBack} />}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={flow.isSubmitted ? 'submitted' : flow.step}
          custom={dir}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          {flow.step === 'compose' ? (
            <StepCompose
              formData={flow.formData}
              setField={flow.setField}
              onReview={flow.goToSeal}
            />
          ) : (
            <StepSeal
              formData={flow.formData}
              identity={flow.identity}
              onRandomize={flow.randomizeIdentity}
              onSubmit={flow.submit}
              onBackToEdit={flow.goToCompose}
              isSubmitted={flow.isSubmitted}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )

  if (isDesktop) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Drop a spill"
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => router.back()}
        />
        <motion.div
          className="relative bg-canvas border border-border rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto z-10 shadow-2xl"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-5 text-muted hover:text-primary transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          {formContent}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-screen bg-canvas">
      {formContent}
    </div>
  )
}
