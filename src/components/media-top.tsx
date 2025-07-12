'use client';

import { useState } from 'react';
import Link from 'next/link';
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

import type { MediaItem } from '@/types/tmdb';
import type { Genre } from '@/lib/utils';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MediaSectionProps {
  title: string;
  items?: MediaItem[];
  genres?: Genre[];
  isLarge?: boolean;
  icon?: React.ReactNode;
  mediaType: 'movie' | 'tv';
}
const MediaTop = ({ title, items, genres, icon, mediaType }: MediaSectionProps) => {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

  if (!items || items.length === 0) return null;

  const getGenreNames = (genreIds: number[]) => {
    if (!genres) return [];

    return genreIds.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean) as string[];
  };

  const handleImageError = (itemId: number) => {
    setImageErrors((prev) => new Set(prev).add(itemId));

    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);

      return newSet;
    });
  };

  const handleImageLoad = (itemId: number) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);

      return newSet;
    });
  };

  const handleImageLoadStart = (itemId: number) => {
    setLoadingImages((prev) => new Set(prev).add(itemId));
  };

  return (
    <div className='relative w-full text-white overflow-hidden mb-20'>
      <div className='flex items-center gap-2 mb-6'>
        {icon}
        <h3 className='text-2xl font-semibold text-white'>{title}</h3>
      </div>

      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 2
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {items.slice(0, 10).map((item, index) => (
            <CarouselItem
              key={item.id}
              className='pl-2 md:pl-4 basis-1/3 sm:basis-1/4 lg:basis-1/6'
            >
              <div className='relative pt-8 pl-8'>
                <div className='absolute left-2 top-2 z-20 pointer-events-none'>
                  <div className='relative w-16 h-16 flex items-center justify-center'>
                    <div className='text-5xl md:text-7xl font-black text-transparent bg-gradient-to-b from-amber-400 via-orange-500 to-red-600 bg-clip-text drop-shadow-lg'>
                      {index + 1}
                    </div>
                    <div className='absolute inset-0 text-5xl md:text-7xl font-black text-yellow-400/20 blur-sm'>
                      {index + 1}
                    </div>
                  </div>
                </div>

                <Link href={`/detail/${mediaType}/${item.id}`}>
                  <div className='group relative aspect-[2/3] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-black'>
                    {loadingImages.has(item.id) && (
                      <div className='absolute inset-0 bg-gray-800 rounded-xl flex items-center justify-center'>
                        <div className='w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin'></div>
                      </div>
                    )}

                    {imageErrors.has(item.id) ? (
                      <div className='absolute inset-0 bg-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-400'>
                        <div className='w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-2'>
                          <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                              fillRule='evenodd'
                              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <span className='text-xs text-center px-2'>Loading Failed</span>
                      </div>
                    ) : (
                      <Image
                        src={`${IMAGE_BASE_URL}${item.poster_path}`}
                        alt={item.title ?? item.name ?? ''}
                        fill
                        className='object-cover rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-lg'
                        sizes='(max-width: 768px) 33vw, 16vw'
                        priority={index < 6}
                        placeholder='blur'
                        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
                        onError={() => handleImageError(item.id)}
                        onLoad={() => handleImageLoad(item.id)}
                        onLoadStart={() => handleImageLoadStart(item.id)}
                      />
                    )}

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
                        <span>{item.release_date ?? item.first_air_date}</span>
                      </div>
                    </div>

                    <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-300 rounded-b-xl'>
                      <h4 className='text-sm font-semibold line-clamp-2 text-white drop-shadow-md'>
                        {item.title ?? item.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
        <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
      </Carousel>
    </div>
  );
};

export default MediaTop;
