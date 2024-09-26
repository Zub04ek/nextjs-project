"use client";

export const Footer = () => {
	const copyrightYear = new Date().getFullYear();
	return (
		<footer className="max-w-7xl w-full px-4 sm:px-12 py-5 mt-auto mx-auto">
			<div className="sm:text-center text-sm text-black ">
				<span className="opacity-80">©{copyrightYear} </span>
				<a
					href="https://github.com/Zub04ek"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-all ease-in-out duration-300 opacity-80 hover:opacity-100 hover:font-semibold"
				>
					Zub04ek.
				</a>
				<span className="opacity-80"> All rights reserved.</span>
			</div>
		</footer>
	);
};
