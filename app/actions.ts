import { Product, ProductFilters } from "@/utils/types";
import axios from "axios";

export const getProducts = async (options?: ProductFilters) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products`,
		);
		let filteredProducts = data.products as Product[];

		if (options?.sortBy) {
			filteredProducts = filteredProducts.sort((a, b) => {
				switch (options?.sortBy) {
					case "HIGHEST_RATING":
						return b.rating - a.rating;
					case "LOWEST_RATING":
						return a.rating - b.rating;
					case "HIGHEST_PRICE":
						return b.price - a.price;
					case "LOWEST_PRICE":
						return a.price - b.price;
					default:
						return b.rating - a.rating;
				}
			});
		}

		if (options?.category) {
			filteredProducts = filteredProducts.filter(prod =>
				options?.category?.includes(prod.category),
			);
		}
		if (options?.tag) {
			filteredProducts = filteredProducts.filter(prod =>
				options?.tag?.filter(t => prod.tags.includes(t)),
			);
		}
		if (options?.search) {
			filteredProducts = filteredProducts.filter(prod =>
				prod.title.toLowerCase().includes(options.search!.toLowerCase()),
			);
		}

		return filteredProducts;
	} catch (error) {
		console.log("error :>> ", error);
	}
};
// export const getProducts = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products`,
// 		);
// 		return data.products as Product[];
// 	} catch (error) {
// 		console.log("error :>> ", error);
// 	}
// };

// export const filteredProducts = (products: Product[], queryParams: { category: string; tag: string; sortBy: string }) => {
// 	const selectedCategories = queryParams?.category?.split(",");
// 	const selectedTags = queryParams?.tag?.split(",");

// 	return products?.filter(prod => {
// 		const isSelectedCategory = selectedCategories?.includes(prod.category);
// 		const isSelectedTag = selectedTags?.filter(t =>
// 			prod.tags.includes(t),
// 		).length;
// 		if (!queryParams?.category && !queryParams?.tag) {
// 			return prod;
// 		} else if (queryParams?.category && queryParams?.tag) {
// 			return isSelectedCategory && isSelectedTag;
// 		} else if (queryParams?.category) {
// 			return isSelectedCategory;
// 		} else if (queryParams?.tag) {
// 			return isSelectedTag;
// 		}
// 	}).sort((a, b) => {
// 		switch (queryParams?.sortBy) {
// 			case "HIGHEST_RATING":
// 				return b.rating - a.rating;
// 			case "LOWEST_RATING":
// 				return a.rating - b.rating;
// 			case "HIGHEST_PRICE":
// 				return b.price - a.price;
// 			case "LOWEST_PRICE":
// 				return a.price - b.price;
// 			default:
// 				return b.rating - a.rating;
// 		}
// 	});
// }
