import type { Metadata } from 'next'
import HomeFeed from '@/components/home-feed'

export const metadata: Metadata = {
  title: 'Lament — Anonymous Workplace Reviews',
  description: 'See what employees really think. Anonymous reviews from organizations across Nigeria.',
}

export default function HomePage() {
  return <HomeFeed />
}
