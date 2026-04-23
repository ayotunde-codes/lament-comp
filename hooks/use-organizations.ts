'use client'

import { useState, useMemo } from 'react'
import { getAllOrganizations } from '@/lib/store'
import type { Industry } from '@/types'

export function useOrganizations() {
  const [query, setQuery] = useState('')
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'All'>('All')

  const organizations = useMemo(() => getAllOrganizations(), [])

  const filtered = useMemo(() => {
    return organizations.filter(org => {
      const matchesQuery = org.name.toLowerCase().includes(query.toLowerCase())
      const matchesIndustry = activeIndustry === 'All' || org.industry === activeIndustry
      return matchesQuery && matchesIndustry
    })
  }, [organizations, query, activeIndustry])

  return { filtered, query, setQuery, activeIndustry, setActiveIndustry }
}
