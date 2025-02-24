import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/interfaces';

function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  const stripped = text.replace(/<[^>]+>/g, '');
  return stripped.length > maxLength ? stripped.slice(0, maxLength) + '...' : stripped;
}

interface ProductCardProps {
  product: Product;
  lowestPrice: number;
  tag: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lowestPrice, tag }) => {
  return (
    <div key={product.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
    <Link href={`/${tag}/products/${product.id}`}>
      <div className="p-4">
        <Image
        // src={product.image.src}
        src={`https://robohash.org/${product.id}?set=set3`}
        alt={product.title}
        width={300}
        height={300}
        className="w-full h-48 object-contain object-center rounded-md mb-4 origin-bottom transition-transform duration-300 hover:scale-125"
        />
      </div>
    </Link>
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{truncateText(product.body_html, 100)}</p>
      <p className="text-sm mb-1">
        <span className="font-medium">Vendor:</span> {product.vendor}
      </p>
      <p className="text-sm mb-1">
        <span className="font-medium">Type:</span> {product.product_type}
      </p>
      <p className="text-lg font-bold mb-2">From ${lowestPrice.toFixed(2)}</p>
      <div className="mb-4"></div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          <Link href={`/${tag}/products/${product.id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
