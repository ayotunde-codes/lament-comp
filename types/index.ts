export type ReactionType = 'REAL_TEA' | 'CAP' | 'HOT_TAKE' | 'HELPFUL' | 'TOO_REAL'

export type ReactionCounts = Record<ReactionType, number>

export interface ReactionDescriptor {
  type: ReactionType
  emoji: string
  label: string
  ariaSuffix: string
}

export const REACTIONS: readonly ReactionDescriptor[] = [
  { type: 'REAL_TEA', emoji: '🍵', label: 'Real Tea',  ariaSuffix: 'rings true' },
  { type: 'CAP',      emoji: '🧢', label: 'Cap',       ariaSuffix: 'cap' },
  { type: 'HOT_TAKE', emoji: '🔥', label: 'Hot Take',  ariaSuffix: 'hot take' },
  { type: 'HELPFUL',  emoji: '🤝', label: 'Helpful',   ariaSuffix: 'helpful' },
  { type: 'TOO_REAL', emoji: '😬', label: 'Too Real',  ariaSuffix: 'felt that one' },
]

export const ZERO_REACTION_COUNTS: ReactionCounts = {
  REAL_TEA: 0,
  CAP: 0,
  HOT_TAKE: 0,
  HELPFUL: 0,
  TOO_REAL: 0,
}

export type Tenure = 'LT_1Y' | 'ONE_TO_TWO_Y' | 'THREE_TO_FIVE_Y' | 'FIVE_PLUS_Y' | 'INTERVIEW'
export type Role = 'ENGINEERING' | 'DESIGN' | 'PRODUCT' | 'SALES' | 'MARKETING' | 'OPS' | 'HR' | 'FINANCE' | 'CUSTOMER_SUPPORT' | 'OTHER'
export type EmploymentStatus = 'CURRENT' | 'FORMER' | 'INTERVIEWED'

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
  tags: string[]
  tenure?: Tenure | null
  role?: Role | null
  status?: EmploymentStatus | null
  createdAt: string
  reactionCounts: ReactionCounts
  commentCount: number
}

export interface VibeCheck {
  tag: string
  avgRating: number
  count: number
}

export interface Comment {
  id: string
  reviewId: string
  username: string
  avatar: string
  avatarColor: string
  body: string
  createdAt: string
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
