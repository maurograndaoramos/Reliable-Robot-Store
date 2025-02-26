import { fetchAllProducts } from '@/lib/shopify';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const allProducts = await fetchAllProducts();

    const filteredProducts = tag
      ? allProducts.filter((product) =>
        product.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      : allProducts;

    const totalInventory = filteredProducts.reduce(
      (total, product) => total + (product.inventory ?? 0),
      0
    );

    const response = {
      products: filteredProducts,
      totalInventory,
      tags: []
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error('Error fetching products by tag:', error);
    return new Response(JSON.stringify({ error: 'Failed to load products' }), {
      status: 500
    });
  }
}

//Another comment to test workflow
