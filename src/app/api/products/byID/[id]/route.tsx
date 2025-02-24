import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProducts } from '@/lib/shopify';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allProducts = await fetchAllProducts();
    const product = allProducts.find((p) => p.id.toString() === params.id);

    if (!product) {
      return NextResponse.json({ error: 'Failed to load product' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}
