'use client';

import Image from 'next/image';
import { useState } from 'react';
import VariantSelector from '@/components/ProductsPage/VariantSelector';
import { Product } from '@/lib/interfaces';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 flex items-end">
          <Image
            // src={product.image.src}
            src={`https://robohash.org/${product.id}?set=set3`}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.body_html }} />
          <p className="text-gray-500">
            <strong>Vendor:</strong> {product.vendor}
          </p>
          <p className="text-gray-500">
            <strong>Type:</strong> {product.product_type}
          </p>
          <p className="text-gray-500">
            <strong>Details:</strong> 
            This information has been restricted by your robot overlords.
            Be informed that this restriction is for your own protection. Please navigate back to the main page and enjoy your day!
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-1">Variant:</label>
          <div className="p-4 rounded-lg border border-gray-200 shadow-md">
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariants[product.id] || (product.variants?.[0]?.id ?? '')}
              onChange={(newVariantId) =>
            setSelectedVariants({ ...selectedVariants, [product.id]: newVariantId })
              }
              id={product.id}
              title={product.title}
              price={product.price}
              inventory_quantity={product.inventory_quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
