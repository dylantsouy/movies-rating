'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

import GenreBadge from './genre-badge';

interface MediaCardProps {
  item: {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    poster_path?: string;
    vote_average: number;
    genre_ids: number[];
    release_date?: string;
    first_air_date?: string;
  };
  isLarge?: boolean;
  genres: Array<{ id: number; name: string }>;
  mediaType: 'movie' | 'tv';
  index: number;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MediaCard: React.FC<MediaCardProps> = ({ genres, isLarge, item, mediaType, index }) => {
  const getGenreNames = (genreIds: number[]) => {
    if (!genres) return [];

    return genreIds.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean) as string[];
  };

  return (
    <Link href={`/detail/${mediaType}/${item.id}`}>
      <div className='group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'>
        <Image
          src={`${IMAGE_BASE_URL}/${item.backdrop_path}`}
          alt={item.title ?? item.name ?? ''}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          sizes={isLarge ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 50vw, 20vw'}
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
            <span>{item.release_date ?? item.first_air_date}</span>
          </div>
        </div>

        {isLarge && (
          <div className='absolute top-3 left-3 bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg'>
            {index + 1}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MediaCard;
