'use client'
import { useSyncExternalStore } from 'react'

const QUERY = '(min-width: 768px)'

function subscribe(notify: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', notify)
  return () => mq.removeEventListener('change', notify)
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

export function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
