import { fetchAllProducts } from '@/lib/shopify';
import { extractTagsFromProducts } from '@/lib/tags';
import ErrorPage from '@/components/Error';
import Hero from '@/components/TagsPage/Hero';
import TagCard from '@/components/TagsPage/TagCard';

export default async function TagsPage() {
  const ERROR_MESSAGE = 'Failed to load tags';
  let tags: string[] = [];

  try {
    const products = await fetchAllProducts();
    tags = await extractTagsFromProducts(products);
  } catch (error) {
    console.error(error);
    return <ErrorPage error={ERROR_MESSAGE} />;
  }

  return (
    <div className="space-y-8">
      <Hero />
      <h1 className="text-3xl font-bold">Product Tags</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tags.map((tag) => (
          <TagCard key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
