"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../actions";
import { ChipsArray } from "@/components/ChipsArray";
// import { SearchBar } from "@/components/SearchBar";
// import { SelectField } from "@/components/SelectField";
// import { ProductCard } from "@/components/ProductCard/ProductCard";
// import { ProductCardSkeleton } from "@/components/ProductCard/ProductCardSkeleton";
import { createUrl } from "@/utils/createUrl";
import { Product, ProductFilters } from "@/utils/types";
import { ProductList } from "@/components/ProductList/ProductList";
import { ProductListFilters } from "@/components/ProductList/ProductListFilters";
import { string } from "zod";

// import { z } from "zod";
// import { useQueryParams } from "@/hooks/useQueryParams";

// const queryParamSchema = z.object({
// 	category: z.array(z.string()).optional(),
// 	tag: z.array(z.string()).optional(),
// 	sortBy: z.string(),
// 	page: z.coerce.number().default(0).optional(),
// 	search: z.string().optional(),
// });

// const SORT_OPTIONS = [
// 	"highest rating",
// 	"lowest rating",
// 	"highest price",
// 	"lowest price",
// ];
// const SORT_OPTIONS = [
// 	"HIGHEST_RATING",
// 	"LOWEST_RATING",
// 	"HIGHEST_PRICE",
// 	"LOWEST_PRICE",
// ];

export default function ProductsPage({
	searchParams,
}: {
	searchParams?: { category: string; tag: string; sortBy: string };
}) {
	// const { queryParams, setQueryParams } = useQueryParams({
	// 	schema: queryParamSchema,
	// 	defaultValues: { category: [], tag: [], search: '', page: 1, sortBy: "highest rating" },
	//   });

	const router = useRouter();
	const pathname = usePathname();
	const newSearchParams = useSearchParams();

	const selectedCategories = searchParams?.category?.split(",") || [];
	const selectedTags = searchParams?.tag?.split(",") || [];

	const [search, setSearch] = useState<ProductFilters["search"]>();
	const [sortBy, setSortBy] =
		useState<ProductFilters["sortBy"]>("HIGHEST_RATING");
	const [category, setCategory] = useState<ProductFilters["category"]>();
	const [tag, setTag] = useState<ProductFilters["tag"]>();

	const {
		isPending,
		isError,
		data: products,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
	// const [filteredProducts, setFilteredProducts] = useState<Product[]>(visibleProducts);
	// const [sortBy, setSortBy] = useState<
	// 	"HIGHEST_RATING" | "LOWEST_RATING" | "HIGHEST_PRICE" | "LOWEST_PRICE"
	// >("HIGHEST_RATING");
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [tags, setTags] = useState<Set<string>>(new Set());
	// const [search, setSearch] = useState<string>("");

	useEffect(() => {
		if (products) {
			setVisibleProducts(products);
		}
	}, [products]);

	useEffect(() => {
		const categories = new Set<string>();
		const allTags = new Set<string>();
		if (products) {
			products.forEach(({ category, tags }) => {
				categories.add(category);
				tags.forEach(tag => {
					allTags.add(tag);
				});
			});
		}
		setCategories(categories);
		setTags(allTags);
	}, [products]);

	// useEffect(() => {

	// 	setVisibleProducts(sortedProducts || []);
	// }, [products, sortBy]);

	useEffect(() => {
		if (products) {
			let sortedProducts;
			switch (sortBy) {
				case "HIGHEST_RATING":
					sortedProducts = products?.sort((a, b) => b.rating - a.rating);
					break;
				case "LOWEST_RATING":
					sortedProducts = products?.sort((a, b) => a.rating - b.rating);
					break;
				case "HIGHEST_PRICE":
					sortedProducts = products?.sort((a, b) => b.price - a.price);
					break;
				case "LOWEST_PRICE":
					sortedProducts = products?.sort((a, b) => a.price - b.price);
					break;
				default:
					sortedProducts = products?.sort((a, b) => b.rating - a.rating);
			}
			let filteredProducts = sortedProducts;
			if (search) {
				filteredProducts = sortedProducts?.filter(product => {
					for (let prop in product) {
						const isInclude = product[prop as keyof Product]
							.toString()
							.toLowerCase()
							.includes(search!.toLowerCase());
						if (isInclude) {
							return product;
						}
					}
				});
			}
			setVisibleProducts(filteredProducts);
		}
	}, [products, search, sortBy]);

	const filteredProducts = visibleProducts?.filter(prod => {
		const isSelectedCategory = selectedCategories?.includes(prod.category);
		const isSelectedTag = selectedTags?.filter(t =>
			prod.tags.includes(t),
		).length;
		if (!searchParams?.category && !searchParams?.tag) {
			return prod;
		} else if (searchParams?.category && searchParams?.tag) {
			return isSelectedCategory && isSelectedTag;
		} else if (searchParams?.category) {
			return isSelectedCategory;
		} else if (searchParams?.tag) {
			return isSelectedTag;
		}
	});

	// console.log('filteredProducts :>> ', filteredProducts);

	// const [products, setProducts] = useState<Product[]>([]);
	// const [chipData, setChipData] = useState<string[]>([]);

	const handleDelete = (chipToDelete: string) => () => {
		const selectedSearchParams = new URLSearchParams(
			newSearchParams?.toString(),
		);
		// console.log('selectedSearchParams - del :>> ', selectedSearchParams);
		// if (value.length) {
		// 	selectedSearchParams.set(id, value.toString());
		// } else {
		// 	selectedSearchParams.delete(id);
		// }
		// const queryString = createUrl(pathname, selectedSearchParams);
		// router.push(queryString);
		if (chipToDelete === "all") {
			setCategory([]);
			setTag([]);
			selectedSearchParams.delete("category");
			selectedSearchParams.delete("tag");
			// selectedSearchParams.delete("sortBy");
		} else {
			const isCategory = selectedCategories?.includes(chipToDelete);
			// console.log('searchParams?.category :>> ', searchParams?.category);
			const isTag = selectedTags?.includes(chipToDelete);
			// console.log('searchParams?.tag :>> ', searchParams?.tag);
			if (isCategory) {
				if (searchParams?.category?.split(",").length === 1) {
					selectedSearchParams.delete("category");
				} else {
					selectedSearchParams.set(
						"category",
						selectedCategories
							?.filter(chip => chip !== chipToDelete)
							.join(",") || "",
					);
				}
			}
			if (isTag) {
				if (searchParams?.tag?.split(",").length === 1) {
					selectedSearchParams.delete("tag");
				} else {
					selectedSearchParams.set(
						"tag",
						selectedTags?.filter(chip => chip !== chipToDelete).join(",") || "",
					);
				}
			}
		}
		const queryString = createUrl(pathname, selectedSearchParams);
		router.push(queryString);

		// setChipData(() => chipData.filter(chip => chip !== chipToDelete));
	};

	// const categories = useMemo(() => {
	// 	const categories = new Set<string>();
	// 	if (searchParams?.tag) {
	// 		filteredProducts?.map(prod => categories.add(prod.category));
	// 	} else {
	// 		products?.map(prod => categories.add(prod.category));
	// 	}
	// 	return [...categories];
	// }, [filteredProducts, products, searchParams?.tag]);

	// const tags = useMemo(() => {
	// 	const tags = new Set<string>();
	// 	if (searchParams?.category) {
	// 		filteredProducts?.map(prod => {
	// 			prod.tags.map(tag => {
	// 				tags.add(tag);
	// 			});
	// 		});
	// 	} else {
	// 		products?.map(prod => {
	// 			prod.tags.map(tag => {
	// 				tags.add(tag);
	// 			});
	// 		});
	// 	}
	// 	return [...tags];
	// }, [filteredProducts, products, searchParams?.category]);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		try {
	// 			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTSBASE_URL}/products`);
	// 			const allProducts = data.products as Product[];
	// 			setProducts(allProducts);
	// 		} catch (error) {
	// 			console.log("error :>> ", error);
	// 		}
	// 	};
	// 	fetchProducts();
	// }, []);

	// useEffect(() => {
	// 	setChipData([
	// 		...(searchParams?.category?.split(",") || []),
	// 		...(searchParams?.tag?.split(",") || []),
	// 	]);
	// }, [searchParams?.category, searchParams?.tag]);

	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-10 max-w-7xl px-12 pt-16 pb-[100px] my-0 mx-auto">
				<div className="flex gap-3 flex-wrap items-center">
					<h1 className="flex-[0_1_calc(20%-9.6px)] text-2xl">
						Products: {filteredProducts ? filteredProducts.length : 0}
					</h1>
					<ProductListFilters
						categories={categories}
						tags={tags}
						onChange={filters => {
							setSortBy(filters.sortBy);
							setCategory(filters.category);
							setTag(filters.tag);
							setSearch(filters.search);
						}}
					/>
				</div>
				<ChipsArray
					chipsArray={[...selectedCategories, ...selectedTags]}
					handleDelete={handleDelete}
				/>
				<ProductList
					products={filteredProducts}
					isPending={isPending}
					isError={isError}
					error={error}
				/>
			</div>
		</main>
	);
}
