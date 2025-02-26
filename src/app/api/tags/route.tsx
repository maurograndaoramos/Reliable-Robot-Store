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
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to load tags' }, { status: 500 });
  }
}

//adding commentary to test pull
