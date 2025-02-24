import { Product } from '@/lib/interfaces';

export async function extractTagsFromProducts(products: Product[]): Promise<string[]> {
  const tagsSet = new Set<string>();
  products.forEach(product => {
    product.tags.forEach(tag => {
      if (tag) tagsSet.add(tag);
    });
  });
  return Array.from(tagsSet);
}

//Just a comment to test the commit
