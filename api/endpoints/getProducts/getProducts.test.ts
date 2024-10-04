import axios from 'axios';

import { Product } from '@/types/types';
import { getProducts } from '@/api/endpoints/getProducts';

jest.mock('axios');

describe('getProducts', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product A',
      brand: 'Unknown brand',
      category: 'home',
      tags: ['home'],
      price: 3,
      discountPercentage: 5,
      thumbnail: 'some_image.jpeg',
      rating: 3,
    },
    {
      id: 2,
      title: 'Product B',
      brand: 'Unknown brand',
      category: 'home',
      tags: ['home'],
      price: 3,
      discountPercentage: 5,
      thumbnail: 'some_image.jpeg',
      rating: 5,
    },
    {
      id: 3,
      title: 'Product C',
      brand: 'Unknown brand',
      category: 'home',
      tags: ['home'],
      price: 3,
      discountPercentage: 5,
      thumbnail: 'some_image.jpeg',
      rating: 4,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products and return them sorted by rating in descending order', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { products: mockProducts },
    });

    const result = await getProducts();

    expect(axios.get).toHaveBeenCalledWith(`${process.env.PRODUCTSBASE_URL}/products`);

    expect(result).toEqual([
      {
        id: 2,
        title: 'Product B',
        brand: 'Unknown brand',
        category: 'home',
        tags: ['home'],
        price: 3,
        discountPercentage: 5,
        thumbnail: 'some_image.jpeg',
        rating: 5,
      },
      {
        id: 3,
        title: 'Product C',
        brand: 'Unknown brand',
        category: 'home',
        tags: ['home'],
        price: 3,
        discountPercentage: 5,
        thumbnail: 'some_image.jpeg',
        rating: 4,
      },
      {
        id: 1,
        title: 'Product A',
        brand: 'Unknown brand',
        category: 'home',
        tags: ['home'],
        price: 3,
        discountPercentage: 5,
        thumbnail: 'some_image.jpeg',
        rating: 3,
      },
    ]);
  });

  it('should throw an error if the axios request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getProducts()).rejects.toThrow('Network error');

    expect(axios.get).toHaveBeenCalledWith(`${process.env.PRODUCTSBASE_URL}/products`);
  });
});
