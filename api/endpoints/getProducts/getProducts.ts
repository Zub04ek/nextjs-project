'use server';

import axios from 'axios';

import { Product } from '@/types/types';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get(`${process.env.PRODUCTSBASE_URL}/products`);
    const products = data.products as Product[];
    return products.sort((a, b) => b.rating - a.rating);
  } catch (error) {
    throw error;
  }
};
