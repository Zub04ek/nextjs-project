'use client';

import { useEffect, useState } from 'react';
import { Product, ProductFilters } from '@/types/types';
import { ChipsArray } from '@/components/ChipsArray';
import { ProductList, ProductListFilters } from '@/components/ProductList';
import { useDebounce } from '@/hooks/useDebounce';
import { Chip, Fab } from '@mui/material';
import { CloseOutlined, KeyboardArrowUp } from '@mui/icons-material';
import { ScrollTop } from '../ScrollTop';

interface ProductsProps {
  products: Product[];
}

export const Products = ({ products }: ProductsProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());

  const [sortBy, setSortBy] = useState<ProductFilters['sortBy']>('Highest rating');
  const [category, setCategory] = useState<ProductFilters['category']>([]);
  const [tag, setTag] = useState<ProductFilters['tag']>([]);
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
          },
        );

        const isSelectedCategory = category.length === 0 || category.includes(product.category);
        const isSelectedTag = tag.length === 0 || tag.filter((t) => product.tags.includes(t)).length;

        return isFoundFromSearch && isSelectedCategory && isSelectedTag;
      });
      setVisibleProducts(filteredProducts);
    }
  }, [sortBy, category, tag, debouncedSearch]);

  const handleDelete = (group: string, chipToDelete: string) => {
    if (group === 'category') {
      setCategory((prev) => prev.filter((c) => c !== chipToDelete));
    }
    if (group === 'tag') {
      setTag((prev) => prev.filter((t) => t !== chipToDelete));
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
          filters={{ sortBy, category, tag, search }}
          setSortBy={setSortBy}
          setCategory={setCategory}
          setTag={setTag}
          setSearch={setSearch}
          onChange={(filters) => {
            setSortBy(filters.sortBy);
            setCategory(filters.category);
            setTag(filters.tag);
            setSearch(filters.search);
          }}
        />
      </div>
      <ul className="flex min-h-8 flex-wrap items-center gap-2">
        {category.length > 0 && <ChipsArray group="category" chipsArray={category} handleDelete={handleDelete} />}
        {tag.length > 0 && <ChipsArray group="tag" chipsArray={tag} handleDelete={handleDelete} />}
        {(category.length > 0 || tag.length > 0) && (
          <li>
            <Chip
              variant="outlined"
              label="Clear all"
              color="error"
              onDelete={() => {
                setCategory([]);
                setTag([]);
              }}
              deleteIcon={<CloseOutlined />}
            />
          </li>
        )}
      </ul>
      <ProductList products={visibleProducts} />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </main>
  );
};
