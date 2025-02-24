import { Product, ShopifyProduct, Variant } from '@/lib/interfaces';

const SHOPIFY_BASE_URL = process.env.SHOPIFY_BASE_URL;
if (!SHOPIFY_BASE_URL) {
  throw new Error('Missing Shopify base URL in environment variables.');
}

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
if (!SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing Shopify access token in environment variables.');
}

export async function fetchProductById(productId: string): Promise<Product | null> {
  try {
    const url = `${SHOPIFY_BASE_URL!.replace(/\.json$/, '')}/${productId}.json?access_token=${SHOPIFY_ACCESS_TOKEN}`;
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    const shopifyProduct: ShopifyProduct | undefined = json.product;
    if (!shopifyProduct) {
      return null;
    }
    const product: Product = {
      id: shopifyProduct.id,
      title: shopifyProduct.title,
      body_html: shopifyProduct.body_html,
      vendor: shopifyProduct.vendor,
      product_type: shopifyProduct.product_type,
      tags: shopifyProduct.tags ? shopifyProduct.tags.split(',').map((tag) => tag.trim()) : [],
      image: shopifyProduct.image,
      variants: shopifyProduct.variants.map((variant: Variant) => ({
        id: variant.id,
        title: variant.title,
        price: variant.price,
        inventory_quantity: variant.inventory_quantity,
      })),
      inventory: shopifyProduct.variants.reduce((total, variant) => total + variant.inventory_quantity, 0),
    };
    return product;
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    return null;
  }
}