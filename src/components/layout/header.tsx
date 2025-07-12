'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Film, Tv, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const pathname = usePathname();

  const isMoviesPage = pathname.includes('/movie');
  const isTvPage = pathname.includes('/tv');

  return (
    <header className='bg-black/95 backdrop-blur-md border-b border-gray-800/50 fixed w-full z-50 top-0 shadow-2xl'>
      <div className='container mx-auto px-4 flex items-center justify-between h-16'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-3 group'>
          <div className='relative'>
            <Star className='w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300 group-hover:rotate-12 transform' />
            <div className='absolute inset-0 bg-yellow-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300'></div>
          </div>
          <span className='text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition-all duration-300'>
            MOVIE RATING
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-2'>
          <Button
            asChild
            variant='ghost'
            className={`
              px-6 py-2 h-10 rounded-full transition-all duration-300 relative group
              ${
                isMoviesPage
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            <Link href='/movie' className='flex items-center space-x-2'>
              <Film className='w-4 h-4' />
              <span>Movies</span>
              {isMoviesPage && (
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
              )}
            </Link>
          </Button>

          <Button
            asChild
            variant='ghost'
            className={`
              px-6 py-2 h-10 rounded-full transition-all duration-300 relative group
              ${
                isTvPage
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            <Link href='/tv' className='flex items-center space-x-2'>
              <Tv className='w-4 h-4' />
              <span>TV Shows</span>
              {isTvPage && (
                <div className='absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
              )}
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 rounded-full'
              >
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='top'
              className='bg-black/95 backdrop-blur-md border-b border-gray-800/50 pt-20'
            >
              <div className='flex flex-col space-y-4 p-4'>
                <Button
                  asChild
                  variant='ghost'
                  className={`
                    w-full justify-start rounded-xl h-12 transition-all duration-300
                    ${
                      isMoviesPage
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Link href='/movie' className='flex items-center space-x-3'>
                    <Film className='w-5 h-5' />
                    <span className='text-lg'>Movies</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant='ghost'
                  className={`
                    w-full justify-start rounded-xl h-12 transition-all duration-300
                    ${
                      isTvPage
                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Link href='/tv' className='flex items-center space-x-3'>
                    <Tv className='w-5 h-5' />
                    <span className='text-lg'>TV Shows</span>
                  </Link>
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
