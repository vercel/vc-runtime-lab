import { NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@shop/api-client'

export async function GET() {
  return NextResponse.json(MOCK_PRODUCTS)
}
