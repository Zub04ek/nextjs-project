import Image from 'next/image';
import { Chip } from '@mui/material';
import { Product } from '@/types/types';
import { StarRating } from '../StarRating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { thumbnail, title, brand, rating, price, discountPercentage } = product;

  const priceWithoutDiscount = Number(((price * 100) / (100 - discountPercentage)).toFixed(2));

  return (
    <a
      href="/"
      className="block overflow-hidden rounded-2xl bg-white transition-shadow duration-500 hover:shadow-[4px_4px_24px_0px_#04032329]"
    >
      {/* <div className="relative "> */}
      <Image
        src={thumbnail}
        alt={title}
        width={384}
        height={310}
        priority
        style={{ width: '100%', height: '310px' }}
        className="h-auto w-full object-cover"
      />
      {/* </div> */}
      <div className="grid grid-rows-[70px_26px_24px_56px] gap-y-1 p-6">
        <h2 className="line-clamp-2 font-open_sans text-2xl font-bold text-[#1A191F]">{title}</h2>
        <p className="self-center text-sm text-black">{brand ? brand : 'Unknown brand'}</p>
        <StarRating rating={rating} />
        <div className="self-end">
          {discountPercentage > 4 && (
            <div>
              <span className="mr-1 font-open_sans text-sm font-bold text-[#A8A9AA] line-through">
                ${priceWithoutDiscount}
              </span>
              <Chip
                label={`-${Math.floor(discountPercentage)}%`}
                size="small"
                sx={{
                  height: '14px',
                  backgroundColor: '#FF3257',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              />
            </div>
          )}
          <p className="font-open_sans text-[32px] font-bold leading-8 text-black">${price}</p>
        </div>
      </div>
    </a>
  );
};
