"use client";

import { useEffect, useState } from "react";
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
// 	category: z.array(z.string()),
// 	tag: z.array(z.string()),
// 	sortBy: z.string(),
// 	page: z.coerce.number().default(0).optional(),
// 	search: z.string().optional(),
// });

// const categories = ["beauty", "health", "sport", "home"];
const tags = ["new", "updated", "old"];
const SORT_OPTIONS = [
	"highest price",
	"lowest price",
	"highest rating",
	"lowest rating",
];

export default function ProductsPage({
	searchParams,
}: {
	searchParams?: { category: string; tag: string; sortBy: string };
}) {
	// console.log('searchParams.category :>> ', searchParams?.category);

	// const { queryParams, setQueryParams } = useQueryParams({
	// 	schema: queryParamSchema,
	// 	defaultValues: { category: [], tag: [], search: '', page: 1, sortBy: "highest rating" },
	//   });

	//   console.log('queryParams :>> ', searchParams);

	const router = useRouter();
	const pathname = usePathname();
	const newSearchParams = useSearchParams();

	const {
		isPending,
		isError,
		data: products,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategoryList,
	});
	// console.log('data :>> ', data);

	// const [products, setProducts] = useState<Product[]>([]);

	// const [selectedSort, setSelectedSort] = useState<string>("");
	// const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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
			const selectedCategories = searchParams?.category?.split(",")
			const selectedTags = searchParams?.tag?.split(",")
			const isCategory = selectedCategories?.includes(chipToDelete);
			// console.log('searchParams?.category :>> ', searchParams?.category);
			const isTag = (searchParams?.tag || "").includes(chipToDelete);
			// console.log('searchParams?.tag :>> ', searchParams?.tag);
			if (isCategory) {
				selectedSearchParams.set("category", selectedCategories?.filter(chip => chip !== chipToDelete).join(",") || "");
				console.log(selectedCategories?.length);
				if (!selectedCategories?.length) {
					selectedSearchParams.delete("category");
				}
			}
			if (isTag) {
				selectedSearchParams.set("tag", selectedTags?.filter(chip => chip !== chipToDelete).join(",") || "");
				if (!selectedTags?.length) {
					selectedSearchParams.delete("tag");
				}
			}
		}
		const queryString = createUrl(pathname, selectedSearchParams);
		router.push(queryString);
		// setChipData(() => chipData.filter(chip => chip !== chipToDelete));
	};

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
						Products: {products ? products.length : 0}
					</h1>
					<ul className="flex gap-3 flex-wrap flex-auto">
						<li className="flex-1">
							<SelectField
								id="sortBy"
								options={SORT_OPTIONS}
								multiple={false}
								selectValue={searchParams?.sortBy || ""}
								// selectValue={queryParams.sortBy}
								// setSelectValue={setSelectedSort}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="category"
								labelName="Category"
								options={categories || []}
								selectValue={searchParams?.category?.split(",") || []}
								// selectValue={queryParams.category}
								// setSelectValue={setSelectedCategory}
								multiple
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="tag"
								labelName="Tag"
								options={tags}
								multiple
								selectValue={searchParams?.tag?.split(",") || []}
								// selectValue={queryParams.tag}
								// setSelectValue={setSelectedTag}
							/>
						</li>
					</ul>
					<div className="flex-[0_1_calc(20%-9.6px)]">
						<SearchBar />
					</div>

					{/* <input className="flex-[0_1_calc(20%-9.6px)]" type="search" name="" id="" /> */}
				</div>
				<ul className="min-h-8 flex gap-2 flex-wrap items-center">
					{ (
						<ChipsArray chipsArray={[
							...(searchParams?.category?.split(",") || []),
							...(searchParams?.tag?.split(",") || []),
						]} handleDelete={handleDelete} />
					)}
				</ul>
				<ul className="flex gap-4 flex-wrap">
					{/* {isPending && <li>loading...</li>} */}
					{isError && <li>Error: {error.message}</li>}
					{products
						? products.map(product => {
								return (
									<li key={product.id} className="basis-[calc((100%-32px)/3)]">
										<ProductCard product={product} />
									</li>
								);
						  })
						: new Array(9).fill(null).map((_, i) => {
								return (
									<li key={i} className="basis-[calc((100%-32px)/3)]">
										<ProductCardSkeleton />
									</li>
								);
						  })}
				</ul>
			</div>
		</main>
	);
}
