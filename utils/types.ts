// export type SelectFieldProps = {
// 	id: string;
// 	labelName?: string;
// 	options: Array<string>;
// } & (
// 		| { selectValue: Array<string>; setSortBy?: never }
// 		| { selectValue: string; setSortBy: Function }
// 	);

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
	sortBy: "highest rating" | "lowest rating" | "highest price" | "lowest price";
	category: Array<string>;
	tag: Array<string>;
	search: string;
  };