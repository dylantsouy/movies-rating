'use client';

import { Star } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

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

interface HeroCarouselProps {
  onItemClick: (item: MediaItem) => void;
  items: MediaItem[];
  genres: Genre[] | undefined;
}

const HeroCarousel = ({ onItemClick, items, genres }: HeroCarouselProps) => {
  const getGenreNames = (genreIds: number[]) => {
    if (!genres) return [];

    return genreIds.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean) as string[];
  };

  return (
    <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
      <CarouselContent>
        {items.slice(0, 5).map((item) => (
          <CarouselItem key={item.id} className='relative'>
            <div className='relative h-[80vh] min-h-[400px] max-h-[700px] w-full'>
              <div
                className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(${IMAGE_BASE_URL}${item.backdrop_path})` }}
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

              <div className='absolute left-18 top-1/2 -translate-y-1/2 z-30 max-w-[300px] space-y-3 p-4'>
                <div className='w-[80px] h-[80px] bg-zinc-800 rounded-[1rem] shadow-2xl overflow-hidden border-[2px]'>
                  <img
                    src={`${IMAGE_BASE_URL}${item?.backdrop_path}`}
                    alt='Top Game Demo'
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                  {getGenreNames(item.genre_ids)
                    .slice(0, 3)
                    .map((genre, i) => (
                      <span
                        className='bg-white/20 text-xs px-2 py-1 rounded whitespace-nowrap'
                        key={i}
                      >
                        {genre}
                      </span>
                    ))}
                </div>
                <h2 className='text-3xl font-bold leading-tight'>{item.title ?? item.name}</h2>
                <p className='text-gray-300 text-sm leading-relaxed'>{item.title ?? item.name}</p>

                <div className='flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-sm md:text-base bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 w-fit'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current flex-shrink-0' />
                    <span className='font-semibold text-white whitespace-nowrap'>
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <span className='text-gray-300 whitespace-nowrap'>
                    {item.vote_count.toLocaleString()} votes
                  </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <button
                    className='bg-white text-black px-4 py-2 rounded font-semibold w-fit cursor-pointer hover:bg-gray-100 transition-colors'
                    onClick={() => onItemClick(item)}
                    onKeyDown={(e) => e.key === 'Enter' && onItemClick(item)}
                  >
                    📱 See Details
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
      <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
    </Carousel>
  );
};

export default HeroCarousel;
