import type { Metadata } from 'next'
import HomeFeed from '@/components/home-feed'

export const metadata: Metadata = {
  title: 'Cooperate Tea — The anonymous voice of the workplace',
  description: 'Honest, anonymous spills from people who actually worked there. Sealed identity, brewed truth.',
}

export default function HomePage() {
  return <HomeFeed />
}
