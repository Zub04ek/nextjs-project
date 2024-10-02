'use client';

import { CSSProperties } from 'react';

interface StarProps {
  rating: number;
}

export const ProductCardRating = ({ rating }: StarProps) => {
  const starStyle = {
    '--rating': rating,
  } as CSSProperties;

  return <div className="Stars" style={starStyle} aria-label={`Rating of this product is ${rating} out of 5.`}></div>;
};
