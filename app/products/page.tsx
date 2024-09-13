"use client";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Products } from "@/components/Products";
import { getQueryClient } from "@/utils/get-query-client";
import { getProducts } from "../actions";

export default function ProductsPage() {
	const queryClient = getQueryClient();

	// void queryClient.prefetchQuery(productOptions)

	queryClient.prefetchQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Products />
		</HydrationBoundary>
	);
}
