import { Product } from "@/utils/types";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCard/ProductCardSkeleton";

type ProductListProps = {
	products: Product[];
    isPending: boolean;
    isError: boolean;
    error: Error | null;
};

export const ProductList = ({ products, isPending, isError, error }: ProductListProps) => {
	return (
		<ul className="flex gap-4 flex-wrap">
			{isPending &&
				new Array(9).fill(null).map((_, i) => {
					return (
						<li key={i} className="basis-[calc((100%-32px)/3)]">
							<ProductCardSkeleton />
						</li>
					);
				})}
			{isError && <li>Error: {error?.message}</li>}
			{products?.length ? (
				products.map(product => {
					return (
						<li key={product.id} className="basis-[calc((100%-32px)/3)]">
							<ProductCard product={product} />
						</li>
					);
				})
			) : (
				<li>Nothing found</li>
			)}
		</ul>
	);
};
