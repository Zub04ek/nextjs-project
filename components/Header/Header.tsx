"use client";

import Image from "next/image";

export const Header = () => {
	return (
		<header className="max-w-7xl w-full px-4 sm:px-12 py-5 mx-auto">
			<nav className="flex items-center justify-between">
				<a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
					<Image
						src="/next.svg"
						alt="Next.js Logo"
						width={100}
						height={24}
						priority
					/>
				</a>
				<a
					href="https://vercel.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={100}
						height={24}
						priority
					/>
				</a>
			</nav>
		</header>
	);
};
