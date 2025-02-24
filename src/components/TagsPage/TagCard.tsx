'use client';

import Link from 'next/link';

interface TagCardProps {
  tag: string;
}

// <Link href={`/${encodeURIComponent(tag)}/products`} className="block bg-white p-4 rounded-lg shadow hover:bg-blue-50 transition-colors p-6">

export default function TagCard({ tag }: TagCardProps) {
  return (
        <Link href={`/${encodeURIComponent(tag)}/products`}>
            <div className="block bg-white p-4 rounded-lg shadow transition-all duration-300 hover:ring-2 hover:ring-blue-500 text-lg ">
                {tag}
            </div>
        </Link>
  );
}
