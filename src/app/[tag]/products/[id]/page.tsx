import { notFound } from 'next/navigation';
import { fetchProductById } from '@/lib/ids';
import Link from 'next/link';
import ProductDetailClient from '@/components/ProductsPage/ProductDetailClient';

export default async function ProductDetailPage({
  params: rawParams,
}: {
  params: Promise<{ tag: string; id: string }>;
}) {
  const { tag, id } = await rawParams;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Link href={`/${tag}/products`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Back
        </button>
      </Link>
      <ProductDetailClient product={product} />
    </>
  );
}

//comments, comments, comments