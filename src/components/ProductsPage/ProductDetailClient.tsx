'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import VariantSelector from '@/components/ProductsPage/VariantSelector';
import { Product } from '@/lib/interfaces';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const isLowInventory = product.inventory_quantity <= 5 && product.inventory_quantity > 0;
  const isOutOfStock = product.inventory_quantity === 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-lg bg-white p-4 shadow-md group">
            {isLowInventory && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Only {product.inventory_quantity} left!
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Out of stock
              </span>
            )}
            <Image
              src={`https://robohash.org/${product.id}?set=set3`}
              alt={product.title}
              width={500}
              height={500}
              className="object-contain w-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <p className="text-lg font-bold text-blue-600 mb-2">
              {selectedVariants[product.id]
                ? `$${Number(product.variants?.find(v => v.id === selectedVariants[product.id])?.price || 0).toFixed(2)}`
                : `$${Number(product.variants?.[0]?.price || 0).toFixed(2)}`
              }
            </p>

            <p className="text-sm mb-1">
              <span className="font-bold">Inventory:</span>
              <span className={`${isLowInventory ? 'text-yellow-600' : isOutOfStock ? 'text-red-600' : 'text-green-600'} ml-1`}>
                {product.inventory_quantity}
              </span>
            </p>

            <p className="text-sm mb-1">
              <span className="font-bold">Vendor:</span>
              <span className="ml-1">{product.vendor}</span>
            </p>

            <p className="text-sm mb-1">
              <span className="font-bold">Type:</span>
              <span className="ml-1">{product.product_type}</span>
            </p>
          </div>

          <div className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.body_html }} />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Variant:</label>
            <div className="p-4 rounded-lg border border-gray-200 shadow-sm bg-gray-50">
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

          <p className="text-gray-500 text-sm mt-4 italic">
            <strong>Note:</strong> Some product details have been restricted by your robot overlords. Be informed that this restriction is for your own protection. Please navigate back to the main page and enjoy your day!
          </p>
        </div>
      </div>
    </div>
  );
}
