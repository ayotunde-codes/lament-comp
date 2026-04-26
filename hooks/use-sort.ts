'use client'

import { useMemo, useState } from 'react'
import type { Review, SortOrder } from '@/types'

export function useSort(reviews: Review[]) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('Latest')

  const sorted = useMemo(() => {
    const copy = [...reviews]
    if (sortOrder === 'Latest')
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if (sortOrder === 'Top')
      return copy.sort((a, b) => b.rating - a.rating || b.likes - a.likes)
    return copy.sort((a, b) => a.rating - b.rating)
  }, [reviews, sortOrder])

  return { sorted, sortOrder, setSortOrder }
}
