import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import { TanstackProvider } from '@/providers/TanstackProvider';
import theme from '@/utils/theme';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Products',
  description: 'Get products from DummyJSON API',
  metadataBase: new URL('https://nextjs-project-eight-rust.vercel.app'),
  openGraph: {
    title: 'Products',
    description: 'Get products from DummyJSON API',
    url: 'https://nextjs-project-eight-rust.vercel.app/',
    siteName: 'Next.js',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col font-inter">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <TanstackProvider>{children}</TanstackProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
