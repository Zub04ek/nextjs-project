import { Product } from "@/utils/types";
import { ProductCard, ProductCardSkeleton } from "../ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface ProductListProps {
	products: Product[];
	isPending: boolean;
	isError: boolean;
	error: Error | null;
}

export const ProductList = ({
	products,
	isPending,
	isError,
	error,
}: ProductListProps) => {
	return (
		<motion.ul
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// layout
			className="flex gap-4 flex-wrap justify-center"
		>
			{/* {isPending &&
				[...Array(9)].fill(null).map((_, i) => {
					return (
						<li key={i} className="basis-[calc((100%-32px)/3)]">
							<ProductCardSkeleton />
						</li>
					);
				})} */}
			{isError && <li>Error: {error?.message}</li>}
			{products.length ? (
				<AnimatePresence>
					{products.map(product => {
						return (
							<motion.li
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								layout
								key={product.id}
								className="basis-[clamp(224px,_100%,_384px)] md:basis-[clamp(328px,_calc((100%-16px)/2),_384px)] lg:basis-[calc((100%-32px)/3)]"
							>
								<ProductCard product={product} />
							</motion.li>
						);
					})}
				</AnimatePresence>
			) :  (
				<li>Loading...</li>
			)}
		</motion.ul>
	);
};
