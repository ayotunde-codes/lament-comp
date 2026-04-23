import type { Metadata } from 'next'
import ReviewFlowContainer from '@/components/review/review-flow-container'

export const metadata: Metadata = {
  title: 'Write a Review — Lament',
  description: 'Share your anonymous workplace experience.',
}

export default function ReviewPage() {
  return <ReviewFlowContainer />
}
