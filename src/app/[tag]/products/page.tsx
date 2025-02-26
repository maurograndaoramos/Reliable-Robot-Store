import ProductCard from '@/components/ProductsPage/ProductCard';
import ErrorPage from '@/components/Error';
import Link from 'next/link';
import { Product, Params } from '@/lib/interfaces';
import { fetchAllProducts } from '@/lib/shopify';

export default async function ProductsPage({
  params: rawParams,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await rawParams;
  const ERROR_MESSAGE = 'Failed to load products';
  let products: Product[] = [];
  let totalInventory = 0;

  try {
    const allProducts = await fetchAllProducts();
    const filteredProducts = tag
      ? allProducts.filter((product) =>
        product.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      : allProducts;

    totalInventory = filteredProducts.reduce(
      (total, product) => total + (product.inventory ?? 0),
      0
    );
    products = filteredProducts;
  } catch (error) {
    console.error(error);
    return <ErrorPage error={ERROR_MESSAGE} />;
  }
  return (
    <>
      <Link href="/">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Back
        </button>
      </Link>
      <div className="mt-6 mb-6 p-4 bg-white shadow-lg border border-gray-200 rounded-lg text-xl font-semibold text-gray-800">
        Total Available {tag} Products in Stock: {totalInventory}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const lowestPrice =
            product.variants?.length
              ? Math.min(...product.variants.map((variant) => parseFloat(variant.price)))
              : 0;
          return (
            <ProductCard
              key={product.id}
              product={product}
              lowestPrice={lowestPrice}
              tag={tag}
              
            />
          );
        })}
      </div>
    </>
  );
}
