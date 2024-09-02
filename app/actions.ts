import { Product } from "@/types";
import axios from "axios"

export const getProducts = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products`);
    return data.products as Product[];
}

export const getCategoryList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products/category-list`);
    return data;
}