import { NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '../route'

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params
  const product = MOCK_PRODUCTS.find((p) => p.id === id)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}
