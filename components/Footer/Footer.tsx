'use client';

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();
  return (
    <footer className="mx-auto mt-auto w-full max-w-7xl px-4 py-5 sm:px-12">
      <div className="text-center text-sm text-black">
        <span className="opacity-80">©{copyrightYear} </span>
        <a
          href="https://github.com/Zub04ek"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 transition-all duration-300 ease-in-out hover:font-semibold hover:opacity-100"
        >
          Zub04ek.
        </a>
        <span className="opacity-80"> All rights reserved.</span>
      </div>
    </footer>
  );
};
