import PDPPage from '@/components/PDPPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return <PDPPage productId={id} />
}
