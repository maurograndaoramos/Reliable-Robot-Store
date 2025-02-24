import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProducts } from '@/lib/shopify';
import { extractTagsFromProducts } from '@/lib/tags';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedTag = searchParams.get('tag');

    const products = await fetchAllProducts();
    let uniqueTags = await extractTagsFromProducts(products);

    if (selectedTag) {
      uniqueTags = uniqueTags.filter(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      );
    }

    return NextResponse.json({ tags: uniqueTags });
  } catch {
    return NextResponse.json({ tags: [] });
  }
}