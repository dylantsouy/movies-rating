'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='bg-black text-white py-4 px-6 sticky top-0 z-50 border-b border-gray-800'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold text-red-600font-black text-transparent bg-gradient-to-b from-amber-400 via-orange-500 to-red-600 bg-clip-text drop-shadow-lg'
        >
          MOVIEs RATING
        </Link>
        <nav className='flex items-center gap-4'>
          <Button variant='ghost' className='text-white hover:bg-gray-800'>
            Movies
          </Button>
          <Button variant='ghost' className='text-white hover:bg-gray-800'>
            TV Shows
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
