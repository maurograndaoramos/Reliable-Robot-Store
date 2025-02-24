import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProducts } from '@/lib/shopify';
import ErrorPage from '@/components/Error';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allProducts = await fetchAllProducts();
    const product = allProducts.find((p) => p.id.toString() === params.id);

    if (!product) {
      const errorHtml = ReactDOMServer.renderToString(<ErrorPage />);
      return new NextResponse(errorHtml, {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return NextResponse.json({ product });
  } catch {
    const errorHtml = ReactDOMServer.renderToString(<ErrorPage />);
    return new NextResponse(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
