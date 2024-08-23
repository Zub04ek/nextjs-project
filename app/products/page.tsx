"use client";

import { useEffect, useState } from "react";
import ChipsArray from "@/components/ChipsArray";
import SearchBar from "@/components/SearchBar";
import SelectField from "@/components/SelectField";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

interface Product {
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

export default function ProductsPage() {
	const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	const prices = [
		"highest price",
		"lowest price",
		"highest rating",
		"lowest rating",
	];

	const [products, setProducts] = useState<Product[]>([]);

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

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await axios.get(`${BASE_URL}/products`);
				const allProducts = data.products as Product[];
				setProducts(allProducts);
			} catch (error) {
				console.log("error :>> ", error);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		const allCriteria = selectedCategory.concat(selectedTag);
		setChipData(allCriteria);
	}, [selectedCategory, selectedTag]);

	return (
		<main className="min-h-screen">
			<div className="flex flex-col gap-10 max-w-7xl px-12 pt-16 pb-[100px] my-0 mx-auto">
				<div className="flex gap-3 flex-wrap items-center">
					<h1 className="flex-[0_1_calc(20%-9.6px)] text-2xl">Products: 64</h1>
					<ul className="flex gap-3 flex-wrap flex-auto">
						<li className="flex-1">
							<SelectField
								id="sort"
								options={prices}
								multiple={false}
								selectValue={selectedSort}
								setSelectValue={setSelectedSort}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="select-category"
								labelName="Category"
								options={categories}
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
					{products.map(product => {
						return (
							<li key={product.id} className="basis-[calc((100%-32px)/3)]">
								<ProductCard product={product} />
							</li>
						);
					})}
				</ul>
			</div>
		</main>
	);
}
