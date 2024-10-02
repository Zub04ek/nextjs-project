'use client';

import { useProducts } from '@/api/hooks/useProducts';
import { Products } from './Products.client';

export const ProductsRequest = () => {
  const { data: products } = useProducts();

  if (!products) {
    return null;
  }

  return <Products products={products} />;
};
