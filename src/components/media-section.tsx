'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import MediaCard from './media-card';

import type { MediaItem } from '@/types/tmdb';
import type { Genre } from '@/lib/utils';

interface MediaSectionProps {
  mediaType: 'movie' | 'tv';
  title: string;
  items?: MediaItem[];
  genres?: Genre[];
  isLarge?: boolean;
  icon?: React.ReactNode;
}

const MediaSection = ({
  title,
  items,
  genres,
  mediaType,
  icon,
  isLarge = false
}: MediaSectionProps) => {
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
          {items?.map((item, index) => (
            <CarouselItem
              key={item.id}
              className={`pl-2 md:pl-4 ${
                isLarge
                  ? 'basis-full sm:basis-1/2 lg:basis-1/3'
                  : 'basis-1/2 sm:basis-1/3 lg:basis-1/5'
              }`}
            >
              <MediaCard
                isLarge={isLarge}
                key={item.id}
                item={item}
                genres={genres ?? []}
                mediaType={mediaType}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
        <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
      </Carousel>
    </div>
  );
};

export default MediaSection;
