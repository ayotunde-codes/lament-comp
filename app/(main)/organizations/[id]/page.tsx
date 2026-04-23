import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getOrgById, getReviewsByOrgId } from '@/lib/store'
import OrgDetailView from '@/components/org-detail-view'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const org = getOrgById(id)
  if (!org) return {}
  return {
    title: `${org.name} Reviews — Lament`,
    description: `Anonymous employee reviews for ${org.name}. Read honest opinions about culture, pay, and management.`,
  }
}

export default async function OrgDetailPage({ params }: Props) {
  const { id } = await params
  const org = getOrgById(id)
  if (!org) notFound()
  const reviews = getReviewsByOrgId(id)
  return <OrgDetailView org={org} reviews={reviews} />
}
