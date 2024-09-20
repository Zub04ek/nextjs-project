import { Product } from "@/utils/types";
import { ProductCard, ProductCardSkeleton } from "../ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface ProductListProps {
	products: Product[];
	// isPending: boolean;
	// isError: boolean;
	// error: Error | null;
}

export const ProductList = ({
	products,
}: ProductListProps) => {
	return (
		<motion.ul
			className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
		>
			
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
