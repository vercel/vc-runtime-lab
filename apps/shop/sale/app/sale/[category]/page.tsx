import SalePage from '@/components/SalePage'

interface Props {
  params: Promise<{ category: string }>
}

export const metadata = { title: 'Sale' }

export default async function Page({ params }: Props) {
  const { category } = await params
  return <SalePage category={category} />
}
