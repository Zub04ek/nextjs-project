import { useDebounce } from "@/hooks/useDebounce";
import { Product, ProductFilters } from "@/utils/types";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SelectField } from "@/components/SelectField";

type ProductListFiltersProps = {
	onChange: (filters: ProductFilters) => void;
    products: Product[];
};

const SORT_OPTIONS = [
	"HIGHEST_RATING",
	"LOWEST_RATING",
	"HIGHEST_PRICE",
	"LOWEST_PRICE",
];

export const ProductListFilters = ({ onChange, products }: ProductListFiltersProps) => {
	const [search, setSearch] = useState<ProductFilters["search"]>("");
	const debouncedSearch = useDebounce(search);

	const [sortBy, setSortBy] =
		useState<ProductFilters["sortBy"]>("HIGHEST_RATING");
	const [category, setCategory] = useState<ProductFilters["category"]>();
	const [tag, setTag] = useState<ProductFilters["tag"]>();

	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [tags, setTags] = useState<Set<string>>(new Set());

    useEffect(() => {
		const categories = new Set<string>();
		const allTags = new Set<string>();
		if (products) {
			products.forEach(({ category, tags }) => {
				categories.add(category);
				tags.forEach(tag => {
					allTags.add(tag);
				});
			});
		}
		setCategories(categories);
		setTags(allTags);
	}, [products]);

	useEffect(() => {
		onChange({ sortBy, category, tag, search: debouncedSearch });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy, category, tag, debouncedSearch]);

	return (
		<>
			<ul className="flex gap-3 flex-wrap flex-auto">
				<li className="flex-1">
					<SelectField
						id="sortBy"
						options={SORT_OPTIONS}
						multiple={false}
						selectValue={sortBy}
						setValue={setSortBy}
					/>
				</li>
				<li className="flex-1">
					<SelectField
						id="category"
						labelName="Category"
						options={Array.from(categories)}
						selectValue={category || []}
                        setValue={setCategory}
						multiple
					/>
				</li>
				<li className="flex-1">
					<SelectField
						id="tag"
						labelName="Tag"
						options={Array.from(tags)}
						multiple
						selectValue={tag || []}
                        setValue={setTag}
					/>
				</li>
			</ul>
			<div className="flex-[0_1_calc(20%-9.6px)]">
				<SearchBar onChange={setSearch} />
			</div>
		</>
	);
};
