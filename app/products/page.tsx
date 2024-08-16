import SelectWithLabel from "@/components/SelectWithLabel";
import React from "react";

export default function ProductsPage() {
	const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	return (
		<main className="min-h-screen">
			<div className="max-w-7xl px-12 pt-16 pb-[100px] my-0 mx-auto">
				<div className="flex items-center">
					<h1>Products: 64</h1>
					<ul className="flex">
						<li>
							<SelectWithLabel
								id="select-category"
								labelName="Category"
								options={categories}
							/>
						</li>
						<li>
							<SelectWithLabel id="select-tag" labelName="Tag" options={tags} />
						</li>
					</ul>
					<input type="search" name="" id="" />
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
