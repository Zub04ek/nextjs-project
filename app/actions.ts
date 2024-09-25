"use server"
import { Product } from "@/utils/types";
import axios from "axios";

export const getProducts = async (): Promise<Product[]> => {
	try {
		const { data } = await axios.get(
			`${process.env.PRODUCTSBASE_URL}/products`,
		);
		const products = data.products as Product[];
        return products.sort((a, b) => b.rating - a.rating);
	} catch (error) {
		throw(error)
	}
};

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
