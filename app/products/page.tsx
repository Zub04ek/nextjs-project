"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../actions";
import { ChipsArray } from "@/components/ChipsArray";
import { SearchBar } from "@/components/SearchBar";
import { SelectField } from "@/components/SelectField";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductCardSkeleton } from "@/components/Products/ProductCardSkeleton";
import { createUrl } from "@/utils/createUrl";
import { Product } from "@/utils/types";

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
const SORT_OPTIONS = [
	"HIGHEST_RATING",
	"LOWEST_RATING",
	"HIGHEST_PRICE",
	"LOWEST_PRICE",
];

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

	const selectedCategories = searchParams?.category?.split(",");
	const selectedTags = searchParams?.tag?.split(",");

	const {
		isPending,
		isError,
		data: products,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	// const [filteredProducts, setFilteredProducts] = useState<Product[]>(visibleProducts);
	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
	const [sortBy, setSortBy] = useState<
		"HIGHEST_RATING" | "LOWEST_RATING" | "HIGHEST_PRICE" | "LOWEST_PRICE"
	>("HIGHEST_RATING");
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [tags, setTags] = useState<Set<string>>(new Set());

	useEffect(() => {
		setVisibleProducts(products || []);
	}, [products]);

	useEffect(() => {
		const categories = new Set<string>();
		const tags = new Set<string>();
		products?.forEach(prod => categories.add(prod.category));
		products?.forEach(prod => {
			prod.tags.forEach(tag => {
				tags.add(tag);
			});
		});
		setCategories(categories);
		setTags(tags);
	}, [products]);

	useEffect(() => {
		let sortedProducts;
		switch (sortBy) {
			case "HIGHEST_RATING":
				sortedProducts = products?.sort((a, b) => b.rating - a.rating);
				return;
			case "LOWEST_RATING":
				sortedProducts = products?.sort((a, b) => a.rating - b.rating);
				return;
			case "HIGHEST_PRICE":
				sortedProducts = products?.sort((a, b) => b.price - a.price);
				return;
			case "LOWEST_PRICE":
				sortedProducts = products?.sort((a, b) => a.price - b.price);
				return;
			default:
				sortedProducts = products?.sort((a, b) => b.rating - a.rating);
		}
		setVisibleProducts(sortedProducts || []);
	}, [products, sortBy]);

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
			// setSelectedCategory([]);
			// setSelectedTag([]);
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
					<ul className="flex gap-3 flex-wrap flex-auto">
						<li className="flex-1">
							<SelectField
								id="sortBy"
								options={SORT_OPTIONS}
								multiple={false}
								// selectValue={searchParams?.sortBy || ""}
								selectValue={sortBy}
								setSortBy={setSortBy}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="category"
								labelName="Category"
								options={Array.from(categories)}
								selectValue={selectedCategories || []}
								// selectValue={queryParams.category}
								// setQueryParams={setQueryParams}
								multiple
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="tag"
								labelName="Tag"
								options={Array.from(tags)}
								multiple
								selectValue={selectedTags || []}
								// selectValue={queryParams.tag}
								// setQueryParams={setQueryParams}
							/>
						</li>
					</ul>
					<div className="flex-[0_1_calc(20%-9.6px)]">
						<SearchBar />
					</div>

					{/* <input className="flex-[0_1_calc(20%-9.6px)]" type="search" name="" id="" /> */}
				</div>
				<ul className="min-h-8 flex gap-2 flex-wrap items-center">
					{
						<ChipsArray
							chipsArray={[
								...(selectedCategories || []),
								...(selectedTags || []),
							]}
							handleDelete={handleDelete}
						/>
					}
				</ul>
				<ul className="flex gap-4 flex-wrap">
					{isPending &&
						new Array(9).fill(null).map((_, i) => {
							return (
								<li key={i} className="basis-[calc((100%-32px)/3)]">
									<ProductCardSkeleton />
								</li>
							);
						})}
					{isError && <li>Error: {error.message}</li>}
					{filteredProducts?.length ? (
						filteredProducts.map(product => {
							return (
								<li key={product.id} className="basis-[calc((100%-32px)/3)]">
									<ProductCard product={product} />
								</li>
							);
						})
					) : (
						<li>Nothing found</li>
					)}
				</ul>
			</div>
		</main>
	);
}
