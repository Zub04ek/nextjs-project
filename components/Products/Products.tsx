"use client";

import { useEffect, useState } from "react";
import { Product, ProductFilters } from "@/utils/types";
import { ChipsArray } from "@/components/ChipsArray";
import { ProductList, ProductListFilters } from "@/components/ProductList";
import { useDebounce } from "@/api/hooks/useDebounce";
import { Chip, Fab } from "@mui/material";
import { CloseOutlined, KeyboardArrowUp } from "@mui/icons-material";
import { ScrollTop } from "../ScrollTop";

interface ProductsProps {
	products: Product[];
}

export const Products = ({ products }: ProductsProps) => {
	const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [tags, setTags] = useState<Set<string>>(new Set());

	const [sortBy, setSortBy] =
		useState<ProductFilters["sortBy"]>("Highest rating");
	const [category, setCategory] = useState<ProductFilters["category"]>([]);
	const [tag, setTag] = useState<ProductFilters["tag"]>([]);
	const [search, setSearch] = useState<ProductFilters["search"]>("");
	const debouncedSearch = useDebounce(search);

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
					case "Highest rating":
						return b.rating - a.rating;
					case "Lowest rating":
						return a.rating - b.rating;
					case "Highest price":
						return b.price - a.price;
					case "Lowest price":
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
					category.length === 0 || category.includes(product.category);
				const isSelectedTag =
					tag.length === 0 || tag.filter(t => product.tags.includes(t)).length;

				return isFoundFromSearch && isSelectedCategory && isSelectedTag;
			});
			setVisibleProducts(filteredProducts);
		}
	}, [sortBy, category, tag, debouncedSearch]);

	const handleDelete = (group: string, chipToDelete: string) => {
		if (group === "category") {
			setCategory(prev => prev.filter(c => c !== chipToDelete));
		}
		if (group === "tag") {
			setTag(prev => prev.filter(t => t !== chipToDelete));
		}
	};

	return (
		<main className="min-h-screen max-w-7xl px-4 sm:px-12 pt-10 pb-[100px] my-0 mx-auto">
			<div className="flex flex-col gap-10">
				<div
					id="back-to-top-anchor"
					className="flex gap-3 flex-wrap sm:items-center "
				>
					<h1 className="lg:flex-[0_1_calc(20%-9.6px)] text-2xl text-[#111111]">
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
					{category.length > 0 && (
						<ChipsArray
							group="category"
							chipsArray={category}
							handleDelete={handleDelete}
						/>
					)}
					{tag.length > 0 && (
						<ChipsArray
							group="tag"
							chipsArray={tag}
							handleDelete={handleDelete}
						/>
					)}
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
				/>
				<ScrollTop >
					<Fab size="small" aria-label="scroll back to top">
						<KeyboardArrowUp />
					</Fab>
				</ScrollTop>
			</div>
		</main>
	);
};
