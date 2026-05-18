import type { Metadata } from 'next'
import ReviewFlowContainer from '@/components/review/review-flow-container'

export const metadata: Metadata = {
  title: 'Drop a Spill — Cooperate Tea',
  description: 'Share your anonymous workplace story. Sealed. No name. No trace.',
}

export default function ReviewPage() {
  return <ReviewFlowContainer />
}
