'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const LoadingSkeleton = () => (
  <div className='bg-black text-white min-h-screen'>
    {/* HeroCarousel Skeleton */}
    <div className='relative w-full'>
      <div className='relative h-[80vh] min-h-[400px] max-h-[700px] w-full'>
        <Skeleton className='absolute inset-0' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

        <div className='absolute left-18 top-1/2 -translate-y-1/2 z-30 max-w-[300px] space-y-3 p-4'>
          <Skeleton className='w-[110px] h-[80px] rounded-[1rem] ' />
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-12' />
            <Skeleton className='h-6 w-12' />
            <Skeleton className='h-6 w-12' />
          </div>
          <Skeleton className='h-8 w-42 mt-6 mb-4' />
          <Skeleton className='h-4 w-24 mb-8' />
          <div className='flex gap-2 mb-6'>
            <Skeleton className='h-6 w-20' />
            <Skeleton className='h-6 w-30' />
          </div>
          <Skeleton className='h-10 w-36' />
        </div>
      </div>
    </div>

    {/* MediaTop Skeleton - Now using Carousel */}
    <div className='relative -mt-32 z-10'>
      <div className='max-w-none px-6 sm:px-8 lg:px-12'>
        <div className='relative w-full text-white overflow-hidden mb-20'>
          <div className='flex items-center gap-2 mb-6'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-8 w-32' />
          </div>

          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 2
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-4'>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='pl-2 md:pl-4 basis-1/3 sm:basis-1/4 lg:basis-1/6'
                >
                  <div className='relative pt-8 pl-8'>
                    <div className='absolute left-2 top-2 z-20'>
                      <Skeleton className='w-16 h-16 rounded-full' />
                    </div>
                    <Skeleton className='aspect-[2/3] rounded-xl' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
            <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
          </Carousel>
        </div>
      </div>
    </div>

    {/* MediaSection Skeleton - Also using Carousel */}
    <div className='max-w-none px-8 sm:px-8 lg:px-12 pb-8'>
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className='mb-16'>
          <div className='flex items-center gap-2 mb-6'>
            <Skeleton className='h-6 w-6' />
            <Skeleton className='h-8 w-48' />
          </div>

          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 2
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-4'>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/5'
                >
                  <Skeleton className='h-32 rounded-xl' />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
            <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
          </Carousel>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
