import type { Metadata } from 'next'
import { fetchOrganizationById } from '@/services/organizations/api'
import OrgDetailView from '@/components/org-detail-view'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const org = await fetchOrganizationById(id)
    return {
      title: `${org.name} Reviews — Lament`,
      description: `Anonymous employee reviews for ${org.name}. Read honest opinions about culture, pay, and management.`,
    }
  } catch {
    return {}
  }
}

export default async function OrgDetailPage({ params }: Props) {
  const { id } = await params
  return <OrgDetailView id={id} />
}
