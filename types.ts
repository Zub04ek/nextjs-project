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