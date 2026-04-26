export interface Review {
  id: string
  orgId: string
  username: string
  avatar: string
  avatarColor?: string
  rating: number
  heading: string
  body: string
  emoji?: string
  voiceUrl?: string | null
  createdAt: string
  likes: number
  dislikes: number
}

export interface Organization {
  id: string
  name: string
  logo: string | null
  industry: Industry
  averageRating: number
  reviewCount: number
}

export enum Industry {
  Tech = 'TECH',
  Finance = 'FINANCE',
  Healthcare = 'HEALTHCARE',
  Education = 'EDUCATION',
  Retail = 'RETAIL',
  Media = 'MEDIA',
  Government = 'GOVERNMENT',
  Energy = 'ENERGY',
  Manufacturing = 'MANUFACTURING',
  Other = 'OTHER',
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  [Industry.Tech]: 'Tech',
  [Industry.Finance]: 'Finance',
  [Industry.Healthcare]: 'Healthcare',
  [Industry.Education]: 'Education',
  [Industry.Retail]: 'Retail',
  [Industry.Media]: 'Media',
  [Industry.Government]: 'Government',
  [Industry.Energy]: 'Energy',
  [Industry.Manufacturing]: 'Manufacturing',
  [Industry.Other]: 'Other',
}

export type SortOrder = 'Latest' | 'Top' | 'Lowest'
