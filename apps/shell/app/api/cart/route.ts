import { NextResponse } from 'next/server'
import type { CartItem } from '@shop/api-client'

const MOCK_CART: CartItem[] = [
  {
    id: 'ci-1',
    productId: 'p-1',
    name: 'Oakwood Platform Bed Frame',
    price: 749,
    quantity: 1,
    image: '/products/p-1-oak-platform-bed.jpg',
    material: 'Solid Oak',
  },
  {
    id: 'ci-2',
    productId: 'p-4',
    name: 'Cloudfoam Hybrid Mattress',
    price: 899,
    quantity: 1,
    image: '/products/p-4-hybrid-mattress.jpg',
    material: 'Pocket Spring + Memory Foam',
  },
  {
    id: 'ci-3',
    productId: 'p-9',
    name: 'Stonewashed Linen Duvet Set',
    price: 189,
    quantity: 2,
    image: '/products/p-9-linen-duvet-set.jpg',
    material: 'Belgian Linen',
  },
]

export async function GET() {
  return NextResponse.json(MOCK_CART)
}
