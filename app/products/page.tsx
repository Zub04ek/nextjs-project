"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProducts, getCategoryList } from "../actions";
import { ChipsArray } from "@/components/ChipsArray";
import { SearchBar } from "@/components/SearchBar";
import { SelectField } from "@/components/SelectField";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductCardSkeleton } from "@/components/Products/ProductCardSkeleton";
import { createUrl } from "@/utils/createUrl";
// import axios from "axios";
// import { Product } from "@/types";
// import { z } from "zod";
// import { useQueryParams } from "@/hooks/useQueryParams";

// const queryParamSchema = z.object({
// 	category: z.array(z.string()).optional(),
// 	tag: z.array(z.string()).optional(),
// 	sortBy: z.string(),
// 	page: z.coerce.number().default(0).optional(),
// 	search: z.string().optional(),
// });

// const categories = ["beauty", "health", "sport", "home"];
// const tags = ["new", "updated", "old"];
const SORT_OPTIONS = [
	"highest rating",
	"lowest rating",
	"highest price",
	"lowest price",
];

export default function ProductsPage({
	searchParams,
}: {
	searchParams?: { category: string; tag: string; sortBy: string };
}) {
	// console.log('searchParam :>> ', searchParams);
	// const { queryParams, setQueryParams } = useQueryParams({
	// 	schema: queryParamSchema,
	// 	defaultValues: { category: [], tag: [], search: '', page: 1, sortBy: "highest rating" },
	//   });
	//   console.log('queryParams :>> ', queryParams);
	//   console.log('queryParams :>> ', JSON.stringify(queryParams));

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
	// const { data: categories } = useQuery({
	// 	queryKey: ["categories"],
	// 	queryFn: getCategoryList,
	// });

	const filteredProducts = products?.filter(prod => {
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
	}).sort((a, b) => b.rating - a.rating);
	// console.log('filteredProducts :>> ', filteredProducts);

	// const [products, setProducts] = useState<Product[]>([]);
	// const [selectedSort, setSelectedSort] = useState<string>("");
	// const [categories, setCategories] = useState<string[]>([]);
	// const [selectedTag, setSelectedTag] = useState<string[]>([]);
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

	const categories = useMemo(() => {
		const categories = new Set<string>();
		if (searchParams?.tag) {
			filteredProducts?.map(prod => categories.add(prod.category));
		} else {
			products?.map(prod => categories.add(prod.category));
		}
		return [...categories];
	}, [filteredProducts, products, searchParams?.tag]);

	const tags = useMemo(() => {
		const tags = new Set<string>();
		if (searchParams?.category) {
			filteredProducts?.map(prod => {
				prod.tags.map(tag => {
					tags.add(tag);
				});
			});
		} else {
			products?.map(prod => {
				prod.tags.map(tag => {
					tags.add(tag);
				});
			});
		}
		return [...tags];
	}, [filteredProducts, products, searchParams?.category]);

	// useEffect(() => {
	// 	products?.map(prod => categories.add(prod.category));
	// 	console.log("categories :>> ", categories);
	// }, [categories, products]);

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
								selectValue={searchParams?.sortBy || ""}
								// selectValue={queryParams.sortBy}
								// setQueryParams={setQueryParams}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="category"
								labelName="Category"
								options={categories}
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
								options={tags}
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
