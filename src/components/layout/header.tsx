'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const pathname = usePathname();

  const isMoviesPage = pathname.startsWith('/movies');
  const isTvPage = pathname.startsWith('/tv-shows');

  return (
    <header className='bg-black border-b border-gray-800 fixed w-full z-50 top-0'>
      <div className='container mx-auto px-4 flex items-center justify-between h-16'>
        <Link href='/' className='flex items-center space-x-2'>
          <span className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent'>
            MOVIE RATING
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-7'>
          <Button
            asChild
            variant={isMoviesPage ? 'secondary' : 'default'}
            className='px-4 py-2 transition-all'
          >
            <Link href='/movies'>Movies</Link>
          </Button>
          <Button
            asChild
            variant={isTvPage ? 'secondary' : 'default'}
            className='px-4 py-2 transition-all'
          >
            <Link href='/tv-shows'>TV Shows</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='default'
                className='text-gray-400 hover:text-white focus:outline-none'
              >
                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side='top' className='bg-black border-b border-gray-800 pt-16'>
              <div className='flex flex-col space-y-4 p-4'>
                <Button
                  asChild
                  variant={isMoviesPage ? 'secondary' : 'default'}
                  className='w-full justify-start'
                >
                  <Link href='/movies'>Movies</Link>
                </Button>
                <Button
                  asChild
                  variant={isTvPage ? 'secondary' : 'default'}
                  className='w-full justify-start'
                >
                  <Link href='/tv-shows'>TV Shows</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
