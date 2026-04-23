export interface Review {
  id: string
  orgId: string
  username: string
  avatar: string
  rating: number
  heading: string
  body: string
  emoji?: string
  voiceUrl?: string
  timestamp: string
  likes: number
  dislikes: number
}

export interface Organization {
  id: string
  name: string
  logo: string
  industry: Industry
  averageRating: number
  reviewCount: number
}

export enum Industry {
  Tech = 'Tech',
  Banking = 'Banking',
  Fintech = 'Fintech',
  Telecom = 'Telecom',
  Agriculture = 'Agriculture',
  Education = 'Education',
  Healthcare = 'Healthcare',
}

export type SortOrder = 'Latest' | 'Top' | 'Lowest'
