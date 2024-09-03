import { Product } from "@/utils/types";
import axios from "axios";

export const getProducts = async () => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products`,
		);
		return data.products as Product[];
	} catch (error) {
		console.log("error :>> ", error);
	}
};

export const getCategoryList = async () => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products/category-list`,
		);
		return data;
	} catch (error) {
		console.log("error :>> ", error);
	}
};
