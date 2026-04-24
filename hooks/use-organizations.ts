'use client'

import { useState } from 'react'
import { useOrganizations as useOrgsQuery } from '@/services/organizations/queries'
import type { Industry } from '@/types'

export function useOrganizations() {
  const [query, setQuery] = useState('')
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'All'>('All')

  const { data, isLoading, isError } = useOrgsQuery({
    search: query || undefined,
    industry: activeIndustry === 'All' ? undefined : activeIndustry,
  })

  return {
    filtered: data?.data ?? [],
    query,
    setQuery,
    activeIndustry,
    setActiveIndustry,
    isLoading,
    isError,
  }
}
