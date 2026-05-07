import BedsPage from '@/components/BedsPage'

interface Props {
  params: Promise<{ subcategory: string }>
}

export const metadata = { title: 'Beds' }

export default async function Page({ params }: Props) {
  const { subcategory } = await params
  return <BedsPage subcategory={subcategory} />
}
