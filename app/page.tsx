import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getProducts } from '@/api/endpoints/getProducts';
import { getQueryClient } from '@/api/getQueryClient';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductsRequest } from '@/components/Products';

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  return (
    <>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsRequest />
      </HydrationBoundary>
      <Footer />
    </>
  );
}
