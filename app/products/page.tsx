"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategoryList } from "../actions";
import {ChipsArray} from "@/components/ChipsArray";
import {SearchBar} from "@/components/SearchBar";
import {SelectField} from "@/components/SelectField";
import {ProductCard} from "@/components/Products/ProductCard";
import {ProductCardSkeleton} from "@/components/Products/ProductCardSkeleton";
// import axios from "axios";
// import { Product } from "@/types";

// const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	const SORT_OPTIONS = [
		"highest price",
		"lowest price",
		"highest rating",
		"lowest rating",
	];

export default function ProductsPage() {
	

	const { isPending, isError, data: products, error } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategoryList,
	});
	// console.log('data :>> ', data);

	// const [products, setProducts] = useState<Product[]>([]);

	const [selectedSort, setSelectedSort] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [selectedTag, setSelectedTag] = useState<string[]>([]);
	const [chipData, setChipData] = useState<string[]>([]);

	const handleDelete = (chipToDelete: string) => () => {
		if (chipToDelete === "all") {
			setSelectedCategory([]);
			setSelectedTag([]);
			return;
		}
		setChipData(() => chipData.filter(chip => chip !== chipToDelete));
		const isCategory = selectedCategory.includes(chipToDelete);
		const isTag = selectedTag.includes(chipToDelete);
		if (isCategory) {
			setSelectedCategory(prev => prev.filter(item => item !== chipToDelete));
		}
		if (isTag) {
			setSelectedTag(prev => prev.filter(item => item !== chipToDelete));
		}
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

	useEffect(() => {
		setChipData([...selectedCategory, ...selectedTag]);
	}, [selectedCategory, selectedTag]);

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
								id="sort"
								options={SORT_OPTIONS}
								multiple={false}
								selectValue={selectedSort}
								setSelectValue={setSelectedSort}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="select-category"
								labelName="Category"
								options={categories || []}
								selectValue={selectedCategory}
								setSelectValue={setSelectedCategory}
								multiple
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="select-tag"
								labelName="Tag"
								options={tags}
								multiple
								selectValue={selectedTag}
								setSelectValue={setSelectedTag}
							/>
						</li>
					</ul>
					<div className="flex-[0_1_calc(20%-9.6px)]">
						<SearchBar />
					</div>

					{/* <input className="flex-[0_1_calc(20%-9.6px)]" type="search" name="" id="" /> */}
				</div>
				<ul className="min-h-8 flex gap-2 flex-wrap items-center">
					{chipData.length > 0 && (
						<ChipsArray chipsArray={chipData} handleDelete={handleDelete} />
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
