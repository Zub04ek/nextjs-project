"use client";

import { useProducts } from "@/hooks/useProducts";
import { Products } from "./Products";
import { Product } from "@/utils/types";

export const ProductsRequest = () => {
	const { data: products, isPending, isError, error } = useProducts();
	// console.log('isPending :>> ', isPending);
	if (products) {
		return <Products products={products as Product[]} />;
	} else {
		return <div>Loading...</div>;
	}
	{
		/* {isPending &&
				[...Array(9)].fill(null).map((_, i) => {
					return (
						<li key={i} className="basis-[calc((100%-32px)/3)]">
							<ProductCardSkeleton />
						</li>
					);
				})} */
	}
	{
		/* {isError && <li>Error: {error?.message}</li>} */
	}
};
