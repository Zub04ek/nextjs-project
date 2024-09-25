import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import { getProducts } from "@/api/endpoints/getProducts";
import { ProductsRequest } from "@/components/Products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function ProductsPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["products"],
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
