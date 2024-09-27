'use client';

import Image from 'next/image';

export const Header = () => {
  return (
    <header className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-12">
      <nav className="flex items-center justify-between">
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          <Image src="/next.svg" alt="Next.js Logo" width={100} height={24} priority />
        </a>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} priority />
        </a>
      </nav>
    </header>
  );
};
