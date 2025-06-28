'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import GenreBadge from './genre-badge';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  original_title?: string;
  original_name?: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MediaSectionProps {
  title: string;
  items?: MediaItem[];
  genres?: Genre[];
  onItemClick: (item: MediaItem) => void;
  isLarge?: boolean;
  icon?: React.ReactNode;
}

const MediaSection = ({
  title,
  items,
  genres,
  onItemClick,
  isLarge = false,
  icon
}: MediaSectionProps) => {
  if (!items || items.length === 0) return null;

  const getGenreNames = (genreIds: number[]) => {
    if (!genres) return [];

    return genreIds.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean) as string[];
  };

  return (
    <div className='mb-16'>
      <div className='flex items-center gap-2 mb-6'>
        {icon}
        <h3 className='text-2xl font-bold text-white'>{title}</h3>
      </div>

      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: isLarge ? 1 : 2
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className={`pl-2 md:pl-4 ${
                isLarge
                  ? 'basis-full sm:basis-1/2 lg:basis-1/3'
                  : 'basis-1/2 sm:basis-1/3 lg:basis-1/5'
              }`}
            >
              <div
                role='button'
                tabIndex={0}
                className='group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'
                onClick={() => onItemClick(item)}
                onKeyDown={(e) => e.key === 'Enter' && onItemClick(item)}
              >
                <Image
                  src={`${IMAGE_BASE_URL}/${item.backdrop_path}`}
                  alt={item.title ?? item.name ?? ''}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                  sizes={
                    isLarge ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 50vw, 20vw'
                  }
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                <div className='absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                  <h4 className='font-bold text-sm mb-1 line-clamp-2 text-white'>
                    {item.title ?? item.name}
                  </h4>
                  <div className='flex flex-wrap gap-1 mb-2'>
                    {getGenreNames(item.genre_ids)
                      .slice(0, 2)
                      .map((genre, i) => (
                        <GenreBadge key={i} genre={genre} variant='card' />
                      ))}
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-300'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-3 h-3 text-yellow-400 fill-current' />
                      <span>{item.vote_average.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span>
                      {item.release_date?.slice(0, 4) ?? item.first_air_date?.slice(0, 4)}
                    </span>
                  </div>
                </div>

                {isLarge && (
                  <div className='absolute top-3 left-3 bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg'>
                    {index + 1}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
        <CarouselNext className='right-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
      </Carousel>
    </div>
  );
};

export default MediaSection;
