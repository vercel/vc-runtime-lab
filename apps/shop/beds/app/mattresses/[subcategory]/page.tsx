import MattressesPage from '@/components/MattressesPage'

interface Props {
  params: Promise<{ subcategory: string }>
}

export const metadata = { title: 'Mattresses' }

export default async function Page({ params }: Props) {
  const { subcategory } = await params
  return <MattressesPage subcategory={subcategory} />
}
