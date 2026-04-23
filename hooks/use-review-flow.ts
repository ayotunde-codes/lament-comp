'use client'
import { useState, useCallback } from 'react'
import { generateIdentity } from '@/lib/avatar'
import { addReview } from '@/lib/store'

export interface ReviewFormData {
  orgId: string
  orgName: string
  title: string
  body: string
  rating: number
  emoji: string
  voiceUrl: string
}

export interface Identity {
  username: string
  avatar: string
}

const INITIAL_FORM: ReviewFormData = {
  orgId: '',
  orgName: '',
  title: '',
  body: '',
  rating: 0,
  emoji: '',
  voiceUrl: '',
}

export function useReviewFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_FORM)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [identity, setIdentity] = useState<Identity>(generateIdentity)

  const goNext = useCallback(() => setStep(s => Math.min(s + 1, 5)), [])
  const goBack = useCallback(() => setStep(s => Math.max(s - 1, 1)), [])

  const setField = useCallback(<K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }, [])

  const randomizeIdentity = useCallback(() => setIdentity(generateIdentity()), [])

  const reset = useCallback(() => {
    setStep(1)
    setFormData(INITIAL_FORM)
    setIsSubmitted(false)
    setIdentity(generateIdentity())
  }, [])

  const submit = useCallback(() => {
    addReview({
      id: crypto.randomUUID(),
      orgId: formData.orgId,
      username: identity.username,
      avatar: identity.avatar,
      rating: formData.rating,
      heading: formData.title,
      body: formData.body,
      emoji: formData.emoji || undefined,
      voiceUrl: formData.voiceUrl || undefined,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    })
    setIsSubmitted(true)
  }, [formData, identity])

  return { step, formData, identity, isSubmitted, goNext, goBack, setField, randomizeIdentity, reset, submit }
}
