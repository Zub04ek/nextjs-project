import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import { getProducts } from "../actions";
import { ProductsRequest } from "@/components/Products/ProductsRequest";

export default async function ProductsPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductsRequest />
		</HydrationBoundary>
	);
}
