'use client';

import Link from 'next/link';
import { Github, Facebook, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='footer flex items-center justify-around h-[150px] bg-black text-base relative w-full z-[105] bottom-0  border-t border-gray-800'>
      <Link href='/' className='main flex text-gray-400'>
        <div className='title text-3xl'>
          <div>MOVIE</div>
          <div>RANKING</div>
        </div>
      </Link>

      <div className='label relative flex flex-wrap text-gray-400 ml-[50px] mt-[60px]'>
        <div className='icon flex absolute -top-[35px] right-0'>
          <div className='logo-area w-[100px] h-[50px] mr-[5px] -translate-y-3'>
            <img
              src='/images/tmdb-logo.svg'
              alt='TMDBLogo'
              className='w-full h-full object-contain'
            />
          </div>

          <a
            href='https://github.com/dylantsouy'
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer ml-[15px] bg-gray-300 flex items-center justify-center w-[25px] h-[25px] rounded-full text-gray-800 transition-all duration-300 hover:opacity-70'
          >
            <Github size={14} />
          </a>

          <a
            href='https://www.facebook.com/fu.y.zou'
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer ml-[15px] bg-gray-300 flex items-center justify-center w-[25px] h-[25px] rounded-full text-gray-800 transition-all duration-300 hover:opacity-70'
          >
            <Facebook size={14} />
          </a>

          <a
            href='https://www.themoviedb.org/documentation/api'
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer ml-[15px] bg-gray-300 flex items-center justify-center w-[25px] h-[25px] rounded-full text-gray-800 transition-all duration-300 hover:opacity-70'
          >
            <Database size={14} />
          </a>
        </div>

        <div className='copyright whitespace-nowrap'>Copyright© 2025 Code by Dylan</div>
      </div>
    </footer>
  );
};

export default Footer;
