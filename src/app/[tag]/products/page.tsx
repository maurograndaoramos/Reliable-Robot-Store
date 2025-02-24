'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductsResponse, Params } from '@/lib/interfaces';
import ProductCard from '@/components/ProductsPage/ProductCard';
import Loading from '@/components/Loading';
import ErrorPage from '@/components/Error';


export default function ProductsPage({ params }: { params: Promise<Params> }) {
  const { tag } = React.use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products/byTag/${tag}`);
        const data: ProductsResponse = await response.json();
        setProducts(data.products);
        setTotalInventory(data.totalInventory);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [tag]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const lowestPrice = product.variants?.length
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
  );
}