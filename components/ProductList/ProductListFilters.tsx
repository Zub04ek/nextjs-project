import { ProductFilters } from '@/types/types';
import { SetStateAction, useEffect } from 'react';
import { ProductsSelect } from '../ProductsSelect';
import { ProductsSearch } from '../ProductsSearch';

interface ProductListFiltersProps {
  filters: ProductFilters;
  categories: Set<string>;
  tags: Set<string>;
  onChange: (filters: ProductFilters) => void;
  setSortBy: (value: SetStateAction<ProductFilters['sortBy']>) => void;
  setCategory: (value: SetStateAction<string[]>) => void;
  setTag: (value: SetStateAction<string[]>) => void;
  setSearch: (value: SetStateAction<string>) => void;
}

const SORT_OPTIONS = ['Highest rating', 'Lowest rating', 'Highest price', 'Lowest price'];

export const ProductListFilters = ({
  filters,
  categories,
  tags,
  onChange,
  setSortBy,
  setCategory,
  setTag,
  setSearch,
}: ProductListFiltersProps) => {
  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <>
      <div className="order-3 flex w-full flex-auto flex-wrap gap-3 lg:order-2 lg:w-auto">
        <div className="w-full sm:flex-1">
          <ProductsSelect
            id="sortBy"
            options={SORT_OPTIONS}
            multiple={false}
            selectValue={filters.sortBy}
            setValue={setSortBy}
          />
        </div>
        <div className="w-full sm:flex-1">
          <ProductsSelect
            id="category"
            labelName="Categories"
            options={Array.from(categories)}
            selectValue={filters.selectedCategories}
            setValue={setCategory}
            multiple
          />
        </div>
        <div className="w-full sm:flex-1">
          <ProductsSelect
            id="tag"
            labelName="Tags"
            options={Array.from(tags)}
            multiple
            selectValue={filters.selectedTags}
            setValue={setTag}
          />
        </div>
      </div>
      <div className="order-2 w-full sm:flex-1 lg:order-3 lg:flex-[0_1_calc(20%-9.6px)]">
        <ProductsSearch searchValue={filters.search} setValue={setSearch} />
      </div>
    </>
  );
};
