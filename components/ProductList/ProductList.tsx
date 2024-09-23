import { Product } from "@/utils/types";
import { ProductCard } from "../ProductCard";
// import { motion, AnimatePresence } from "framer-motion";

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{products.length &&
				// <AnimatePresence>
				products.map((product: Product) => {
					return (
						<li
							// initial={{ opacity: 0 }}
							// animate={{ opacity: 1 }}
							// exit={{ opacity: 0 }}
							// layout
							key={product.id}
						>
							<ProductCard product={product} />
						</li>
					);
				})}
		</ul>
	);
};
