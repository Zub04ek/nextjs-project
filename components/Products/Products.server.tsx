'use client';

import { useState } from 'react';

import { useProducts } from '@/api/hooks/useProducts';
import { ProductSnackbar } from '../ProductSnackbar';
import { Products } from './Products.client';

export const ProductsRequest = () => {
  const [openToast, setOpenToast] = useState<boolean>(true);
  const { data: products, error, isError } = useProducts();

  if (isError) {
    return (
      <ProductSnackbar severity="error" open={openToast} setOpen={() => setOpenToast(false)}>
        {error.message}
      </ProductSnackbar>
    );
  }

  if (!products) {
    return null;
  }

  return <Products products={products} />;
};
