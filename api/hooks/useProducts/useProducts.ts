'use client';

import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Product } from '@/types/types';
import { getProducts } from '@/api/endpoints/getProducts';

export const useProducts = (options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    ...options,
  });
};
