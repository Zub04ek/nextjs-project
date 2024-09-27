import { ProductFilters } from '@/types/types';
import { SetStateAction, useEffect } from 'react';
import { SelectField } from '../SelectField';
import { SearchBar } from '../SearchBar';

interface ProductListFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  setSortBy: (value: SetStateAction<ProductFilters['sortBy']>) => void;
  setCategory: (value: SetStateAction<string[]>) => void;
  setTag: (value: SetStateAction<string[]>) => void;
  setSearch: (value: SetStateAction<string>) => void;
  categories: Set<string>;
  tags: Set<string>;
}

const SORT_OPTIONS = ['Highest rating', 'Lowest rating', 'Highest price', 'Lowest price'];

export const ProductListFilters = ({
  filters,
  onChange,
  setSortBy,
  setCategory,
  setTag,
  setSearch,
  categories,
  tags,
}: ProductListFiltersProps) => {
  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <>
      <ul className="order-3 flex w-full flex-auto flex-wrap gap-3 lg:order-2 lg:w-auto">
        <li className="w-full sm:flex-1">
          <SelectField
            id="sortBy"
            options={SORT_OPTIONS}
            multiple={false}
            selectValue={filters.sortBy}
            setValue={setSortBy}
          />
        </li>
        <li className="w-full sm:flex-1">
          <SelectField
            id="category"
            labelName="Categories"
            options={Array.from(categories)}
            selectValue={filters.category}
            setValue={setCategory}
            multiple
          />
        </li>
        <li className="w-full sm:flex-1">
          <SelectField
            id="tag"
            labelName="Tags"
            options={Array.from(tags)}
            multiple
            selectValue={filters.tag}
            setValue={setTag}
          />
        </li>
      </ul>
      <div className="order-2 w-full sm:flex-1 lg:order-3 lg:flex-[0_1_calc(20%-9.6px)]">
        <SearchBar searchValue={filters.search} setValue={setSearch} />
      </div>
    </>
  );
};
