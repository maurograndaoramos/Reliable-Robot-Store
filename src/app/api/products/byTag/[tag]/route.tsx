import { fetchAllProducts } from '@/lib/shopify';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const allProducts = await fetchAllProducts();

    const filteredProducts = tag
      ? allProducts.filter((product) => product.tags.includes(tag))
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
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to load products' }), {
      status: 500
    });
  }
}