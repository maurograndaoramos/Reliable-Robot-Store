import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductCardProps } from '@/lib/interfaces';

function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  const stripped = text.replace(/<[^>]+>/g, '');
  return stripped.length > maxLength ? stripped.slice(0, maxLength) + '...' : stripped;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lowestPrice, tag }) => {
  const isLowInventory = product.inventory_quantity <= 5 && product.inventory_quantity > 0;
  const isOutOfStock = product.inventory_quantity === 0;

  return (
    <div key={product.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden relative">
      {isLowInventory && (
        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
          Only {product.inventory_quantity} left!
        </span>
      )}
      {isOutOfStock && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Out of stock
        </span>
      )}
      <Link href={`/${tag}/products/${product.id}`} className="block">
        <div className="p-4 relative overflow-hidden group">
          <Image
            src={`https://robohash.org/${product.id}?set=set3`}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-48 object-contain object-center rounded-md mb-4 transition-transform duration-300 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="absolute bottom-4 text-white bg-blue-600 px-3 py-2 rounded">View Product</span>
          </div>
        </div>
      </Link>
      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-3">{truncateText(product.body_html, 100)}</p>
      <p className="text-lg font-bold mb-2">{`From $${lowestPrice.toFixed(2)}`}</p>

      <p className="text-sm mb-1">
        <span className="font-bold">Inventory:</span>
        <span className={`${isLowInventory ? 'text-yellow-600' : isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
          {product.inventory_quantity}
        </span>
      </p>

      <p className="text-sm mb-1">
        <span className="font-bold">Vendor:</span> {product.vendor}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Type:</span> {product.product_type}
      </p>

      <div className="mb-4"></div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full">
          <Link href={`/${tag}/products/${product.id}`} className="w-full inline-block text-center">
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
