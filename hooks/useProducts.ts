'use client';

import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/actions';
import { Product } from '@/utils/types';

export const useProducts = (
    options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>,
) => {
    return useQuery<Product[]>({
        queryKey: ['products'],
		queryFn: () => getProducts(),
        ...options,
    })
}