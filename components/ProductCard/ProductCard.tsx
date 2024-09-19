import Image from "next/image";
import { useMemo } from "react";
import { Chip, ChipProps, Rating } from "@mui/material";
import { Product } from "@/utils/types";

type CustomProductProps = ChipProps & {
	product: Product;
};

export const ProductCard = ({
	product: { thumbnail, title, brand, rating, price, discountPercentage },
}: CustomProductProps) => {
	const priceWithoutDiscount = useMemo(() => {
		return Number(((price * 100) / (100 - discountPercentage)).toFixed(2));
	}, [price, discountPercentage]);

	return (
		<a
			href="/products"
			className="block rounded-2xl bg-white overflow-hidden hover:shadow-[4px_4px_24px_0px_#04032329] transition-shadow duration-500"
		>
			<Image
				src={thumbnail}
				alt="product photo"
				width={384}
				height={310}
				className="w-[384px] h-auto object-cover"
			/>
			<div className="py-4 px-6">
				<h2 className="min-h-16 font-open_sans font-bold text-2xl text-[#1A191F]">
					{title}
				</h2>
				<p className="min-h-5 text-sm text-[#111111]">{brand}</p>
				<Rating value={rating} precision={0.1} size="small" readOnly />
				<div className="min-h-6">
					{discountPercentage > 4 && (
						<>
							<span className="mr-1 font-open_sans font-bold text-sm text-[#A8A9AA] line-through">
								${priceWithoutDiscount}
							</span>
							<Chip
								label={`-${Math.floor(discountPercentage)}%`}
								size="small"
								sx={{
									height: "14px",
									backgroundColor: "#FF3257",
									color: "#FFFFFF",
									fontSize: "12px",
								}}
							/>
						</>
					)}
				</div>
				<p className="font-open_sans font-bold text-[32px] leading-8 text-black">
					${price}
				</p>
			</div>
		</a>
	);
};
