"use client";

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Products } from "@/components/Products";
import { getQueryClient } from '@/utils/get-query-client';
import { productOptions } from '@/utils/product';

export default function ProductsPage() {
	const queryClient = getQueryClient()

	void queryClient.prefetchQuery(productOptions)
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Products/>
		</HydrationBoundary>
	);
}
