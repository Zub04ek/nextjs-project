import { useDebounce } from "@/hooks/useDebounce";
import { ProductFilters } from "@/utils/types";
import { useEffect, useState } from "react";
import { SelectField } from "../SelectField";
import { SearchBar } from "../SearchBar";

interface ProductListFiltersProps {
	onChange: (filters: ProductFilters) => void;
	// handleDelete: Function;
	// handleDelete: (category: Array<string>, tag: Array<string>) => void;
    categories: Set<string>;
	tags: Set<string>;
};

const SORT_OPTIONS = [
	"HIGHEST_RATING",
	"LOWEST_RATING",
	"HIGHEST_PRICE",
	"LOWEST_PRICE",
];

export const ProductListFilters = ({ onChange, categories, tags }: ProductListFiltersProps) => {
	const [search, setSearch] = useState<ProductFilters["search"]>("");
	const debouncedSearch = useDebounce(search);

	const [sortBy, setSortBy] =
		useState<ProductFilters["sortBy"]>("HIGHEST_RATING");
	const [category, setCategory] = useState<ProductFilters["category"]>();
	const [tag, setTag] = useState<ProductFilters["tag"]>();

	useEffect(() => {
		onChange({ sortBy, category: category || [], tag: tag || [], search: debouncedSearch });
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
