"use client";

import { useEffect, useState } from "react";
import ChipsArray from "@/components/ChipComponent";
import SearchField from "@/components/SearchField";
import SelectField from "@/components/SelectField";

interface ChipData {
	key: number;
	label: string;
}

export default function ProductsPage() {
	const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	const prices = ["highest price", "lowest price", "highest rating", "lowest rating"];

	const [selectSort, setSelectSort] = useState<string[]>([]);
	const [selectCategory, setSelectCategory] = useState<string[]>([]);
	const [selectTag, setSelectTag] = useState<string[]>([]);
	const [chipData, setChipData] = useState<ChipData[]>([]);

	const handleDelete = (chipToDelete: ChipData) => () => {
		if (chipToDelete.label === "all") {
			setSelectCategory([]);
			setSelectTag([]);
			return;
		}
		setChipData(() => chipData.filter(chip => chip.key !== chipToDelete.key));
		const isCategory = selectCategory.includes(chipToDelete.label);
		const isTag = selectTag.includes(chipToDelete.label);
		if (isCategory) {
			setSelectCategory(prev => prev.filter(item => item !== chipToDelete.label))
		}
		if (isTag) {
			setSelectTag(prev => prev.filter(item => item !== chipToDelete.label))
		}
	};

	useEffect(() => {
		const allCriteria = (selectCategory.concat(selectTag)).map((val,index) => {
			return {key: index, label: val}
		});
		setChipData(allCriteria)
	}, [selectCategory, selectTag])

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
								selectValue={selectSort}
								setSelectValue={setSelectSort}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="select-category"
								labelName="Category"
								options={categories}
								selectValue={selectCategory}
								setSelectValue={setSelectCategory}
								multiple
							/>
						</li>
						<li className="flex-1">
							<SelectField id="select-tag" labelName="Tag" options={tags} multiple selectValue={selectTag}
								setSelectValue={setSelectTag}/>
						</li>
					</ul>
					<div className="flex-[0_1_calc(20%-9.6px)]">
						<SearchField />
					</div>

					{/* <input className="flex-[0_1_calc(20%-9.6px)]" type="search" name="" id="" /> */}
				</div>
				<ul className="flex gap-3 flex-wrap items-center">
					{ chipData.length > 0 && <ChipsArray chipsArray={chipData} handleDelete={handleDelete}/>}
				</ul>
				<ul>
					<li>
						<div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</li>
					<li>
						<div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</li>
					<li>
						<div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</li>
				</ul>
			</div>
		</main>
	);
}
