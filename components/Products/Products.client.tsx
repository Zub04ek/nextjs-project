'use client';

import { useEffect, useState } from 'react';

import { CloseOutlined } from '@mui/icons-material';
import { Chip } from '@mui/material';

import { Product, ProductFilters } from '@/types/types';
import { useDebounce } from '@/hooks/useDebounce';
import { ChipsArray } from '@/components/ChipsArray';
import { ProductList, ProductListFilters } from '@/components/ProductList';
import { ProductSnackbar } from '../ProductSnackbar';

interface ProductsProps {
  products: Product[];
}

export const Products = ({ products }: ProductsProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());

  const [openToast, setOpenToast] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<ProductFilters['sortBy']>('Highest rating');
  const [selectedCategories, setSelectedCategories] = useState<ProductFilters['selectedCategories']>([]);
  const [selectedTags, setSelectedTags] = useState<ProductFilters['selectedTags']>([]);
  const [search, setSearch] = useState<ProductFilters['search']>('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (products) {
      const categories = new Set<string>();
      const allTags = new Set<string>();

      products.forEach(({ category, tags }) => {
        categories.add(category);
        tags.forEach((tag) => {
          allTags.add(tag);
        });
      });

      setCategories(categories);
      setTags(allTags);
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      const sortedProducts = products.sort((a, b) => {
        switch (sortBy) {
          case 'Highest rating':
            return b.rating - a.rating;
          case 'Lowest rating':
            return a.rating - b.rating;
          case 'Highest price':
            return b.price - a.price;
          case 'Lowest price':
            return a.price - b.price;
          default:
            return b.rating - a.rating;
        }
      });

      const filteredProducts = sortedProducts.filter((product) => {
        const isFoundFromSearch = [product.title, product.brand, product.category, product.tags, product.price].some(
          (item) => {
            if (item) {
              return item.toString().toLowerCase().includes(debouncedSearch.toLowerCase());
            }
          }
        );

        const isSelectedCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const isSelectedTag = selectedTags.length === 0 || selectedTags.filter((t) => product.tags.includes(t)).length;

        return isFoundFromSearch && isSelectedCategory && isSelectedTag;
      });
      setVisibleProducts(filteredProducts);
    }
  }, [sortBy, selectedCategories, selectedTags, debouncedSearch]);

  const handleDelete = (selectLabel: string, chipToDelete: string) => {
    if (selectLabel === 'category') {
      setSelectedCategories((prev) => prev.filter((c) => c !== chipToDelete));
    }
    if (selectLabel === 'tag') {
      setSelectedTags((prev) => prev.filter((t) => t !== chipToDelete));
    }
  };

  return (
    <main className="mx-auto my-0 flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pb-[100px] pt-10 sm:px-12">
      <div id="back-to-top-anchor" className="flex flex-wrap gap-3 sm:items-center">
        <h1 className="text-2xl text-black lg:flex-[0_1_calc(20%-9.6px)]">
          Products: {visibleProducts ? visibleProducts.length : 0}
        </h1>
        <ProductListFilters
          categories={categories}
          tags={tags}
          filters={{ sortBy, selectedCategories, selectedTags, search }}
          setSortBy={setSortBy}
          setCategory={setSelectedCategories}
          setTag={setSelectedTags}
          setSearch={setSearch}
          onChange={(filters) => {
            setSortBy(filters.sortBy);
            setSelectedCategories(filters.selectedCategories);
            setSelectedTags(filters.selectedTags);
            setSearch(filters.search);
          }}
        />
      </div>
      <ul className="flex min-h-8 flex-wrap items-center gap-2">
        {selectedCategories.length > 0 && (
          <ChipsArray selectLabel="category" chips={selectedCategories} handleDelete={handleDelete} />
        )}
        {selectedTags.length > 0 && <ChipsArray selectLabel="tag" chips={selectedTags} handleDelete={handleDelete} />}
        {(selectedCategories.length > 0 || selectedTags.length > 0) && (
          <li>
            <Chip
              variant="outlined"
              label="Clear all"
              color="error"
              onDelete={() => {
                setSelectedCategories([]);
                setSelectedTags([]);
              }}
              deleteIcon={<CloseOutlined />}
            />
          </li>
        )}
      </ul>
      <ProductList products={visibleProducts} setOpen={setOpenToast} />
      <ProductSnackbar severity="info" open={openToast} setOpen={setOpenToast}>
        Product card detailing in the development process!
      </ProductSnackbar>
    </main>
  );
};
