import { notFound } from 'next/navigation';
import { fetchProductById } from '@/lib/ids';
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

  return <ProductDetailClient product={product} />;
}
