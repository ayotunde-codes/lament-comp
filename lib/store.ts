import { SEED_ORGS, SEED_REVIEWS } from './seed-data'
import type { Organization, Review } from '@/types'

const orgs: Organization[] = [...SEED_ORGS]
const reviews: Review[] = [...SEED_REVIEWS]

export function getAllOrganizations(): Organization[] {
  return [...orgs]
}

export function getOrgById(id: string): Organization | undefined {
  return orgs.find(o => o.id === id)
}

export function getReviewsByOrgId(orgId: string): Review[] {
  return reviews.filter(r => r.orgId === orgId)
}

export function getLatestReviews(limit = 50): Review[] {
  return [...reviews]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

export function addReview(review: Review): void {
  reviews.push(review)
  const org = orgs.find(o => o.id === review.orgId)
  if (org) {
    const orgReviews = reviews.filter(r => r.orgId === review.orgId)
    org.reviewCount = orgReviews.length
    org.averageRating =
      Math.round((orgReviews.reduce((sum, r) => sum + r.rating, 0) / orgReviews.length) * 10) / 10
  }
}

export function addOrganization(org: Organization): void {
  orgs.push(org)
}
