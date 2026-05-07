import { NextResponse } from 'next/server'
import type { CartItem } from '@shop/api-client'

const MOCK_CART: CartItem[] = [
  {
    id: 'ci-1',
    productId: 'p-1',
    name: 'Oakwood Platform Bed Frame',
    price: 749,
    quantity: 1,
    gradient: 'linear-gradient(135deg, #c2a986 0%, #8b6f4d 100%)',
    material: 'Solid Oak',
  },
  {
    id: 'ci-2',
    productId: 'p-4',
    name: 'Cloudfoam Hybrid Mattress',
    price: 899,
    quantity: 1,
    gradient: 'linear-gradient(135deg, #f5f1ea 0%, #d4cdb9 100%)',
    material: 'Pocket Spring + Memory Foam',
  },
  {
    id: 'ci-3',
    productId: 'p-9',
    name: 'Stonewashed Linen Duvet Set',
    price: 189,
    quantity: 2,
    gradient: 'linear-gradient(135deg, #e2dccb 0%, #a99e85 100%)',
    material: 'Belgian Linen',
  },
]

export async function GET() {
  return NextResponse.json(MOCK_CART)
}
