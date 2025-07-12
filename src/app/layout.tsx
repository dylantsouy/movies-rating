import { Inter } from 'next/font/google';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import QueryProvider from '@/components/query-provider';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Rating',
  description: 'Movie Rating App',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' className='h-full'>
      <body className={`${inter.className} h-full`}>
        <QueryProvider>
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1 pt-16'>{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
