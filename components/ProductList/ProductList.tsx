import { Product } from "@/utils/types";
import { ProductCard } from "../ProductCard";
import { useTransition, animated } from "react-spring";

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {

	const transitions = useTransition(products, {
		from: { opacity: 0, transform: "translateY(100px)" },
		enter: { opacity: 1, transform: "translateY(0px)" },
		leave: { opacity: 0, transform: "translateY(100px)" },
	});

	// const transitions = useTransition(products, {
	// 	trail: 400 / products.length,
	// 	from: { opacity: 0, scale: 0 },
	// 	enter: { opacity: 1, scale: 1 },
	// 	leave: { opacity: 0, scale: 0 },
	//   })

	return (
		<ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{products.length &&
				transitions((style, product: Product) => {
					return (
						<animated.li
							key={product.id}
							style={{...style}}
						>
							<ProductCard product={product} />
						</animated.li>
					);
				})}
		</ul>
	);
};
