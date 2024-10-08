import { SetStateAction } from 'react';
import Image from 'next/image';

import { animated, useTransition } from 'react-spring';

import { Product } from '@/types/types';
import { ProductCard } from '../ProductCard';

interface ProductListProps {
  products: Product[];
  setOpen: (value: SetStateAction<boolean>) => void;
}

export const ProductList = ({ products, setOpen }: ProductListProps) => {
  const transitions = useTransition(products, {
    from: { opacity: 0, transform: 'translateY(100px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(100px)' },
  });

  if (!products.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src="/icon-search-no-result.png" alt="file folder" width={140} height={140} />
        <div className="text-center text-2xl text-black">Oops, no results for this search!</div>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {transitions((style, product: Product) => {
        return (
          <animated.li key={product.id} style={{ ...style }}>
            <ProductCard product={product} setOpenToast={setOpen} />
          </animated.li>
        );
      })}
    </ul>
  );
};
