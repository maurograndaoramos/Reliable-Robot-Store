export interface Tag {
  tags: string[];
}

export interface Variant {
  id: number;
  title: string;
  price: string;
  inventory_quantity: number;
}

export interface VariantSelectorProps extends Variant {
  variants: Variant[];
  selectedVariant: number | string;
  onChange: (newVariantId: number) => void;
}

export interface Image {
  src: string;
  alt?: string | null;
}

export interface BaseProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  image: Image;
  price: string;
  inventory_quantity: number;
}

export interface ShopifyProduct extends BaseProduct {
  tags: string;
  variants: Variant[];
}

export interface Product extends BaseProduct {
  tags: string[];
  variants: Variant[];
  inventory?: number;
}

export interface ProductsResponse {
  products: Product[];
  totalInventory: number;
  tags: string[];
}

export interface HeaderProps {
  title?: string;
}

export interface Params {
  tag: string;
}