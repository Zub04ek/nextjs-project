import SearchField from "@/components/SearchField";
import SelectField from "@/components/SelectField";
import React from "react";

export default function ProductsPage() {
	const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	const prices = ["highest", "lowest"];
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl px-12 pt-16 pb-[100px] my-0 mx-auto">
				<div className="flex gap-3 flex-wrap items-center">
					<h1 className="flex-[0_1_calc(20%-9.6px)] text-2xl">Products: 64</h1>
					<ul className="flex gap-3 flex-wrap flex-auto">
						<li className="flex-1">
							<SelectField
								id="select-price"
								options={prices}
								defaultValue={prices[0]}
							/>
						</li>
						<li className="flex-1">
							<SelectField
								id="select-category"
								labelName="Category"
								options={categories}
							/>
						</li>
						<li className="flex-1">
							<SelectField id="select-tag" labelName="Tag" options={tags} />
						</li>
					</ul>
					<div className="flex-[0_1_calc(20%-9.6px)]">
						<SearchField />
					</div>

					{/* <input className="flex-[0_1_calc(20%-9.6px)]" type="search" name="" id="" /> */}
				</div>
				{/* <div>ProductsPage</div> */}
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
