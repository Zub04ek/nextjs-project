"use client";

import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { getProducts } from "../../app/actions";
// import { createUrl } from "@/utils/createUrl";
import { Product, ProductFilters } from "@/utils/types";
import { ChipsArray } from "@/components/ChipsArray";
import { ProductList, ProductListFilters } from "@/components/ProductList";
import { useDebounce } from "@/hooks/useDebounce";
import { Chip } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from '@tanstack/react-query'
import { productOptions } from "@/utils/product";

export const Products = ({
	searchParams,
}: {
	searchParams?: { category: string; tag: string; sortBy: string };
}) => {
	
	// If using searchParams
	const router = useRouter();
	const pathname = usePathname();
	const newSearchParams = useSearchParams();
	const selectedCategories = searchParams?.category?.split(",") || [];
	const selectedTags = searchParams?.tag?.split(",") || [];

	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [tags, setTags] = useState<Set<string>>(new Set());

	const [sortBy, setSortBy] =
		useState<ProductFilters["sortBy"]>("highest rating");
	const [category, setCategory] = useState<ProductFilters["category"]>([]);
	const [tag, setTag] = useState<ProductFilters["tag"]>([]);
	const [search, setSearch] = useState<ProductFilters["search"]>("");
	const debouncedSearch = useDebounce(search);

	// const {
	// 	isPending,
	// 	isError,
	// 	data: products,
	// 	error,
	// } = useQuery({
	// 	queryKey: ["products"],
	// 	queryFn: getProducts,
	// });

    const {data: products, isPending, isError, error} = useSuspenseQuery(productOptions)

	useEffect(() => {
		if (products) {
			setVisibleProducts(products);
		}
	}, [products]);

	useEffect(() => {
		if (products) {
			const categories = new Set<string>();
			const allTags = new Set<string>();

			products.forEach(({ category, tags }) => {
				categories.add(category);
				tags.forEach(tag => {
					allTags.add(tag);
				});
			});

			setCategories(categories);
			setTags(allTags);
		}
	}, [products]);

	useEffect(() => {
		if (products) {
			const sortedProducts = products.sort((a, b) => {
				switch (sortBy) {
					case "highest rating":
						return b.rating - a.rating;
					case "lowest rating":
						return a.rating - b.rating;
					case "highest price":
						return b.price - a.price;
					case "lowest price":
						return a.price - b.price;
					default:
						return b.rating - a.rating;
				}
			});

			const filteredProducts = sortedProducts.filter(product => {
				const isFoundFromSearch = [
					product.title,
					product.brand,
					product.category,
					product.tags,
					product.price,
				].some(item => {
					if (item) {
						return item
							.toString()
							.toLowerCase()
							.includes(debouncedSearch.toLowerCase());
					}
				});

				const isSelectedCategory =
					category.length === 0 || category?.includes(product.category);
				const isSelectedTag =
					tag.length === 0 || tag.filter(t => product.tags.includes(t)).length;

				return isFoundFromSearch && isSelectedCategory && isSelectedTag;
			});
			setVisibleProducts(filteredProducts);
		}
	}, [products, sortBy, category, tag, debouncedSearch]);

	// const filteredProducts = visibleProducts?.filter(prod => {
	// 	const isSelectedCategory = selectedCategories?.includes(prod.category);
	// 	const isSelectedTag = selectedTags?.filter(t =>
	// 		prod.tags.includes(t),
	// 	).length;
	// 	if (!searchParams?.category && !searchParams?.tag) {
	// 		return prod;
	// 	} else if (searchParams?.category && searchParams?.tag) {
	// 		return isSelectedCategory && isSelectedTag;
	// 	} else if (searchParams?.category) {
	// 		return isSelectedCategory;
	// 	} else if (searchParams?.tag) {
	// 		return isSelectedTag;
	// 	}
	// });

	// const handleDelete = (chipToDelete: string) => () => {
	// 	const selectedSearchParams = new URLSearchParams(
	// 		newSearchParams?.toString(),
	// 	);
	// 	// console.log('selectedSearchParams - del :>> ', selectedSearchParams);
	// 	// if (value.length) {
	// 	// 	selectedSearchParams.set(id, value.toString());
	// 	// } else {
	// 	// 	selectedSearchParams.delete(id);
	// 	// }
	// 	// const queryString = createUrl(pathname, selectedSearchParams);
	// 	// router.push(queryString);
	// 	if (chipToDelete === "all") {
	// 		setCategory([]);
	// 		setTag([]);
	// 		selectedSearchParams.delete("category");
	// 		selectedSearchParams.delete("tag");
	// 		// selectedSearchParams.delete("sortBy");
	// 	} else {
	// 		const isCategory = selectedCategories?.includes(chipToDelete);
	// 		// console.log('searchParams?.category :>> ', searchParams?.category);
	// 		const isTag = selectedTags?.includes(chipToDelete);
	// 		// console.log('searchParams?.tag :>> ', searchParams?.tag);
	// 		if (isCategory) {
	// 			if (searchParams?.category?.split(",").length === 1) {
	// 				selectedSearchParams.delete("category");
	// 			} else {
	// 				selectedSearchParams.set(
	// 					"category",
	// 					selectedCategories
	// 						?.filter(chip => chip !== chipToDelete)
	// 						.join(",") || "",
	// 				);
	// 			}
	// 		}
	// 		if (isTag) {
	// 			if (searchParams?.tag?.split(",").length === 1) {
	// 				selectedSearchParams.delete("tag");
	// 			} else {
	// 				selectedSearchParams.set(
	// 					"tag",
	// 					selectedTags?.filter(chip => chip !== chipToDelete).join(",") || "",
	// 				);
	// 			}
	// 		}
	// 	}
	// 	const queryString = createUrl(pathname, selectedSearchParams);
	// 	router.push(queryString);

	// 	// setChipData(() => chipData.filter(chip => chip !== chipToDelete));
	// };

	const handleDelete = (group: string, chipToDelete: string) => {
		if (group === "category") {
			setCategory((prev) => prev.filter(c => c !== chipToDelete))
		}
		if (group === "tag") {
			setTag((prev) => prev.filter(t => t !== chipToDelete))
		}
	}
	
	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-10 max-w-7xl px-12 pt-16 pb-[100px] my-0 mx-auto">
				<div className="flex gap-3 flex-wrap items-center">
					<h1 className="flex-[0_1_calc(20%-9.6px)] text-2xl">
						Products: {visibleProducts ? visibleProducts.length : 0}
					</h1>
					<ProductListFilters
						categories={categories}
						tags={tags}
						filters={{ sortBy, category, tag, search }}
						setSortBy={setSortBy}
						setCategory={setCategory}
						setTag={setTag}
						setSearch={setSearch}
						onChange={filters => {
							setSortBy(filters.sortBy);
							setCategory(filters.category);
							setTag(filters.tag);
							setSearch(filters.search);
						}}
					/>
				</div>
				<ul className="min-h-8 flex gap-2 flex-wrap items-center">
					{category.length > 0 && <ChipsArray
					group="category"
						chipsArray={category}
						handleDelete={handleDelete}
					/>}
					{tag.length > 0 && <ChipsArray
					group="tag"
						chipsArray={tag}
						handleDelete={handleDelete}
					/>}
					{(category.length > 0 || tag.length > 0) && (
						<li>
							<Chip
								variant="outlined"
								label="Clear all"
								color="error"
								onDelete={() => {
									setCategory([]);
									setTag([]);
								}}
								deleteIcon={<CloseOutlined />}
							/>
						</li>
					)}
				</ul>
				<ProductList
					products={visibleProducts}
					isPending={isPending}
					isError={isError}
					error={error}
				/>
			</div>
		</main>
	);
}
