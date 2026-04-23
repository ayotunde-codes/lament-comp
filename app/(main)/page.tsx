import type { Metadata } from 'next'
import { getLatestReviews, getAllOrganizations } from '@/lib/store'
import HomeFeed from '@/components/home-feed'

export const metadata: Metadata = {
  title: 'Lament — Anonymous Workplace Reviews',
  description: 'See what employees really think. Anonymous reviews from organizations across Nigeria.',
}

export default function HomePage() {
  const reviews = getLatestReviews()
  const orgs = getAllOrganizations()
  const orgNameMap = Object.fromEntries(orgs.map(o => [o.id, o.name]))

  return <HomeFeed reviews={reviews} orgNameMap={orgNameMap} />
}
