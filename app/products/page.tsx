import ChipsArray from "@/components/ChipComponent";
import SearchField from "@/components/SearchField";
import SelectField from "@/components/SelectField";

export default function ProductsPage() {
	const categories = ["beauty", "health", "sport", "home"];
	const tags = ["new", "updated", "old"];
	const prices = ["highest", "lowest"];
	const chipData = [
		{ key: 0, label: "Angular" },
		{ key: 1, label: "jQuery" },
		{ key: 2, label: "Polymer" },
		{ key: 3, label: "React" },
		{ key: 4, label: "Vue.js" },
	];
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
				<ul className="flex gap-3 flex-wrap items-center">
					<ChipsArray />
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
