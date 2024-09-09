import { Chip } from "@mui/material";

export const ProductCardSkeleton = () => {
    return (
        <div className="block animate-pulse w-fit rounded-2xl bg-white overflow-hidden hover:shadow-[4px_4px_24px_0px_#04032329]">
			<div className="w-[384px] h-[310px] bg-gray-200"/>
			<div className="py-4 px-6">
				<div className="min-h-16 w-full mb-1 font-bold text-2xl bg-gray-200"/>
				<div className="h-5 w-full mb-1 bg-gray-200"/>
				<div className="mr-1 w-full mb-1 h-6 bg-gray-200"/>
				<Chip size="small" sx={{height: "20px", width: "60px", backgroundColor: "#e5e7eb"}} />
			</div>
		</div>
    )
}