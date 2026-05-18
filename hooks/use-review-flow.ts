'use client'
import { useState, useCallback } from 'react'
import { generateIdentity } from '@/lib/avatar'
import { useCreateReview } from '@/services/reviews/queries'
import type { Tenure, Role, EmploymentStatus } from '@/types'

export type ReviewStep = 'compose' | 'seal'

export interface ReviewFormData {
  orgId: string
  orgName: string
  body: string
  rating: number
  emoji: string
  voiceUrl: string
  tags: string[]
  tenure: Tenure | ''
  role: Role | ''
  status: EmploymentStatus | ''
}

export interface Identity {
  username: string
  avatar: string
}

const INITIAL_FORM: ReviewFormData = {
  orgId: '',
  orgName: '',
  body: '',
  rating: 0,
  emoji: '',
  voiceUrl: '',
  tags: [],
  tenure: '',
  role: '',
  status: '',
}

const HEADLINE_MAX = 80

export function deriveHeadline(body: string): string {
  const firstLine = body.split('\n')[0]?.trim() ?? ''
  if (firstLine) return firstLine.slice(0, HEADLINE_MAX)
  return body.trim().slice(0, HEADLINE_MAX)
}

export function useReviewFlow() {
  const [step, setStep] = useState<ReviewStep>('compose')
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_FORM)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [identity, setIdentity] = useState<Identity>(generateIdentity)

  const { mutate: createReview } = useCreateReview()

  const goToSeal = useCallback(() => setStep('seal'), [])
  const goToCompose = useCallback(() => setStep('compose'), [])

  const setField = useCallback(<K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }, [])

  const randomizeIdentity = useCallback(() => setIdentity(generateIdentity()), [])

  const reset = useCallback(() => {
    setStep('compose')
    setFormData(INITIAL_FORM)
    setIsSubmitted(false)
    setIdentity(generateIdentity())
  }, [])

  const submit = useCallback(() => {
    const heading = deriveHeadline(formData.body)
    createReview(
      {
        orgId: formData.orgId,
        rating: formData.rating,
        heading,
        body: formData.body,
        emoji: formData.emoji || undefined,
        voiceUrl: formData.voiceUrl || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        tenure: formData.tenure || undefined,
        role: formData.role || undefined,
        status: formData.status || undefined,
      },
      { onSuccess: () => setIsSubmitted(true) }
    )
  }, [formData, createReview])

  return { step, formData, identity, isSubmitted, goToSeal, goToCompose, setField, randomizeIdentity, reset, submit }
}
