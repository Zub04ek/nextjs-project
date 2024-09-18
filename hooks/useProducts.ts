'use client';

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/actions';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
		queryFn: () => getProducts(),
    })
}