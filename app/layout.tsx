import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/theme';
import './globals.css';
import { TanstackProvider } from '@/providers/TanstackProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const open_sans = Open_Sans({
  weight: ['700'],
  variable: '--font-open-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Products',
  description: 'Get products from DummyJSON API',
  openGraph: {
    title: 'Products',
    description: 'Get products from DummyJSON API',
    url: 'https://nextjs-project-eight-rust.vercel.app/',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png',
        width: 1800,
        height: 1600,
        alt: 'NextJS logo',
      },
    ],
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
    <html lang="en" className={`${inter.variable} ${open_sans.variable} scroll-smooth`}>
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
