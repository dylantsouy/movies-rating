'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import type { Cast, CastCredit } from '@/types/tmdb';

const PersonDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const personId = parseInt(id);
  const router = useRouter();

  const fetchPerson = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<Cast>(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`
    );

    return data;
  };

  const fetchCredits = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<{ cast: CastCredit[] }>(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`
    );

    return data.cast.filter((item) => item.poster_path !== null);
  };

  const castQuery = useQuery<Cast>({
    queryKey: ['cast', personId],
    queryFn: fetchPerson
  });

  const creditsQuery = useQuery<CastCredit[]>({
    queryKey: ['castCredits', personId],
    queryFn: fetchCredits
  });

  const movieCredits = creditsQuery.data?.filter((credit) => credit.media_type === 'movie') ?? [];

  const tvCredits = creditsQuery.data?.filter((credit) => credit.media_type === 'tv') ?? [];

  const formatBirthDate = (birthday?: string) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return `${age} years old`;
  };

  const handleBackClick = () => {
    router.back();
  };

  if (castQuery.isLoading || creditsQuery.isLoading) {
    return <div className='min-h-screen bg-black text-white'>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-black text-white pb-20'>
      <div className='sticky top-0 bg-black z-50 py-4 px-6 border-b border-gray-800'>
        <Button variant='ghost' className='text-white hover:bg-gray-800' onClick={handleBackClick}>
          <ArrowLeft className='h-5 w-5 mr-2' />
          Back
        </Button>
      </div>

      <div className='space-y-8 px-6 pb-10 w-full max-w-full pt-6'>
        <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
          <div className='w-full md:w-1/3 relative aspect-[2/3] rounded-xl overflow-hidden'>
            {castQuery.data?.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${castQuery.data.profile_path}`}
                alt={castQuery.data.name}
                fill
                className='object-contain'
              />
            ) : (
              <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                <span className='text-gray-500'>No Image Available</span>
              </div>
            )}
          </div>
          <div className='w-full md:w-2/3 space-y-4 text-gray-300'>
            <h1 className='text-3xl font-bold tracking-tight text-white'>{castQuery.data?.name}</h1>
            {castQuery.data?.birthday && (
              <p>
                <span className='font-semibold'>Birthday:</span> {castQuery.data.birthday} (
                {formatBirthDate(castQuery.data.birthday)})
              </p>
            )}
            {castQuery.data?.place_of_birth && (
              <p>
                <span className='font-semibold'>Place of Birth:</span>{' '}
                {castQuery.data.place_of_birth}
              </p>
            )}
            {castQuery.data?.biography ? (
              <div>
                <h2 className='text-xl font-bold mb-3'>Biography</h2>
                <p className='leading-relaxed'>{castQuery.data.biography}</p>
              </div>
            ) : (
              <p>No biography available.</p>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          {/* Movies Section */}
          {movieCredits.length > 0 && (
            <div className='space-y-4 pb-10'>
              <h2 className='text-2xl font-bold text-white'>Movies</h2>
              <Carousel opts={{ align: 'start', slidesToScroll: 2 }} className='w-full'>
                <CarouselContent className='-ml-2 md:-ml-4'>
                  {movieCredits.map((credit, index) => (
                    <CarouselItem
                      key={`${credit.id}-${index}-movie`}
                      className='basis-auto md:basis-1/6 lg:basis-1/8'
                    >
                      <Link href={`/detail/movie/${credit.id}`}>
                        <div className='group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'>
                          {credit.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                              alt={credit.title ?? 'Movie poster'}
                              fill
                              className='object-cover'
                            />
                          ) : (
                            <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                              <span className='text-gray-500 text-sm'>No Photo</span>
                            </div>
                          )}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                          <div className='absolute bottom-0 left-0 w-full p-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <p className='font-bold text-white truncate'>{credit.title}</p>
                            <p className='text-gray-300 text-sm truncate'>{credit.character}</p>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
                <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
              </Carousel>
            </div>
          )}

          {/* TV Shows Section */}
          {tvCredits.length > 0 && (
            <div className='space-y-4 pb-10'>
              <h2 className='text-2xl font-bold text-white'>TV Shows</h2>
              <Carousel opts={{ align: 'start', slidesToScroll: 2 }} className='w-full'>
                <CarouselContent className='-ml-2 md:-ml-4'>
                  {tvCredits.map((credit, index) => (
                    <CarouselItem
                      key={`${credit.id}-${index}-tv`}
                      className='basis-auto md:basis-1/6 lg:basis-1/8'
                    >
                      <Link href={`/detail/tv/${credit.id}`}>
                        <div className='group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'>
                          {credit.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                              alt={credit.name ?? 'TV poster'}
                              fill
                              className='object-cover'
                            />
                          ) : (
                            <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                              <span className='text-gray-500 text-sm'>No Photo</span>
                            </div>
                          )}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                          <div className='absolute bottom-0 left-0 w-full p-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <p className='font-bold text-white truncate'>{credit.name}</p>
                            <p className='text-gray-300 text-sm truncate'>{credit.character}</p>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
                <CarouselNext className='right-4 bg-black/70 border-white/20 text-white hover:bg-black/90 hover:text-white hover:border-white/40 backdrop-blur-sm z-40' />
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
