import Image from "next/image";
import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { Product } from "@/utils/types";

type CustomProductProps = ChipProps & {
	product: Product
};

export const ProductCard = ({product: {
	thumbnail,
	title,
	brand,
	rating,
	price,
	discountPercentage,
}}: CustomProductProps) => {
	return (
		<a href="/products" className="block w-fit rounded-2xl bg-white overflow-hidden hover:shadow-[4px_4px_24px_0px_#04032329]">
			<Image src={thumbnail} alt="product photo" width={384} height={310} className="w-[384px] h-auto object-cover"/>
			<div className="py-4 px-6">
				<h2 className="min-h-16 font-open_sans font-bold text-2xl text-[#1A191F]">{title}</h2>
				{brand && <p className="text-sm text-[#111111]">{brand}</p>}
				<p>{rating}</p>
				<span className="mr-1 font-open_sans font-bold text-sm text-[#A8A9AA] line-through">${price}</span>
				<Chip label={`-${discountPercentage}%`} size="small" sx={{height: "14px", backgroundColor: "#FF3257", color: "#FFFFFF", fontSize: "12px"}} />
			</div>
		</a>
	);
}
