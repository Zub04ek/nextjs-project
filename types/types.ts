export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  tags: string[];
  thumbnail: string;
}

export type ProductFilters = {
  sortBy: 'Highest rating' | 'Lowest rating' | 'Highest price' | 'Lowest price';
  selectedCategories: Array<string>;
  selectedTags: Array<string>;
  search: string;
};
