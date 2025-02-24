import { Product, ShopifyProduct } from '@/lib/interfaces';

const SHOPIFY_BASE_URL = process.env.SHOPIFY_BASE_URL;
if (!SHOPIFY_BASE_URL) {
  throw new Error('Missing Shopify base URL in environment variables.');
}

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
if (!SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing Shopify access token in environment variables.');
}

export async function fetchAllProducts(): Promise<Product[]> {
  const shopifyUrl = `${SHOPIFY_BASE_URL}?access_token=${SHOPIFY_ACCESS_TOKEN}`;
  
  const options: RequestInit & { next?: { revalidate: number } } = {
    next: { revalidate: 3600 }
  };
  
  const response = await fetch(shopifyUrl, options);
  if (!response.ok) {
    throw new Error('Failed to fetch products from Shopify');
  }
  const json = await response.json();
  return json.products.map((product: ShopifyProduct) => ({
    id: product.id.toString(),
    title: product.title,
    body_html: product.body_html,
    vendor: product.vendor,
    product_type: product.product_type,
    tags: product.tags.split(',').map(tag => tag.trim()),
    image: product.image,
    variants: product.variants,
    inventory: product.variants.reduce((sum, variant) => sum + variant.inventory_quantity, 0)
  }));
}