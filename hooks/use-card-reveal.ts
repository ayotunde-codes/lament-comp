'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useCardReveal<T extends HTMLElement>(deps: unknown) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const cards = container.querySelectorAll('[data-card]')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 12,
        stagger: 0.055,
        duration: 0.38,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      })
    })

    return () => ctx.revert()
  // deps changes intentionally re-trigger the animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps])

  return ref
}
