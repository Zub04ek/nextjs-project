// export type SelectFieldProps = {
// 	id: string;
// 	labelName?: string;
// 	options: Array<string>;
// } & (
// 		| { selectValue: Array<string>; setSortBy?: never }
// 		| { selectValue: string; setSortBy: Function }
// 	);
export type SelectFieldProps = {
	id: string;
	labelName?: string;
	options: Array<string>;
	selectValue: Array<string> | string; 
	setValue: Function
};

export type SearchBarProps = {
	onChange: Function;
}	

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
	sortBy: "HIGHEST_RATING" | "LOWEST_RATING" | "HIGHEST_PRICE" | "LOWEST_PRICE";
	category?: Array<string>;
	tag?: Array<string>;
	search?: string;
  };