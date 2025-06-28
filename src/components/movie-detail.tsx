'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import StarRating from './start-rating';

import type { Genre, MediaItem, Cast, Review, CastCredit } from '@/types/tmdb';

type MovieDetailProps = {
  item: MediaItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genres: Genre[];
};

const CastDetailContent = ({ cast }: { cast: Cast }) => {
  const { data: credits, isLoading } = useQuery<CastCredit[]>({
    queryKey: ['castCredits', cast.id],
    queryFn: async () => {
      const { data } = await axios.get<{
        cast: CastCredit[];
      }>(
        `https://api.themoviedb.org/3/person/${cast.id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      return data.cast.filter((item) => item.poster_path !== null);
    },
    enabled: !!cast
  });

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

  return (
    <div className='space-y-8 px-6 pb-10 w-full max-w-full'>
      <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
        <div className='w-full md:w-1/3 relative aspect-[2/3] rounded-xl overflow-hidden'>
          {cast.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
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
          <h1 className='text-3xl font-bold tracking-tight text-white'>{cast.name}</h1>
          {cast.birthday && (
            <p>
              <span className='font-semibold'>Birthday:</span> {cast.birthday} (
              {formatBirthDate(cast.birthday)})
            </p>
          )}
          {cast.place_of_birth && (
            <p>
              <span className='font-semibold'>Place of Birth:</span> {cast.place_of_birth}
            </p>
          )}
          {cast.biography ? (
            <div>
              <h2 className='text-xl font-bold mb-3'>Biography</h2>
              <p className='leading-relaxed'>{cast.biography}</p>
            </div>
          ) : (
            <p>No biography available.</p>
          )}
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-white'>Known For</h2>
        {isLoading && <p>Loading...</p>}
        {credits && credits.length > 0 ? (
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 2
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-4'>
              {credits.map((credit) => (
                <CarouselItem key={credit.id} className='basis-auto md:basis-1/6 lg:basis-1/8'>
                  <div className='group relative aspect-[2/3] rounded-lg overflow-hidden cursor-default bg-gray-800'>
                    {credit.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                        alt={credit.title ?? credit.name ?? 'Poster'}
                        fill
                        className='object-cover'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full text-gray-500 text-sm'>
                        No Image
                      </div>
                    )}
                    <div className='absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent opacity-100'>
                      <p className='font-bold text-white truncate'>{credit.title ?? credit.name}</p>
                      <p className='text-gray-300 text-sm truncate'>{credit.character}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
            <CarouselNext className='right-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
          </Carousel>
        ) : (
          <p>No credits available.</p>
        )}
      </div>
    </div>
  );
};

const MovieDetail = ({ item, open, onOpenChange, genres }: MovieDetailProps) => {
  const [view, setView] = useState<'movie' | 'cast'>('movie');
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);
  const mediaType = item.title ? 'movie' : 'tv';

  const { data: castData } = useQuery<Cast[]>({
    queryKey: ['cast', mediaType, item.id],
    queryFn: async () => {
      const { data } = await axios.get<{
        cast: Cast[];
      }>(
        `https://api.themoviedb.org/3/${mediaType}/${item.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      return data.cast.filter((c) => c.profile_path !== null);
    },
    enabled: open
  });

  const { data: reviewData } = useQuery<Review[]>({
    queryKey: ['reviews', mediaType, item.id],
    queryFn: async () => {
      const { data } = await axios.get<{
        results: Review[];
      }>(
        `https://api.themoviedb.org/3/${mediaType}/${item.id}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      return data.results;
    },
    enabled: open
  });

  const { data: detailData } = useQuery<MediaItem>({
    queryKey: ['detail', mediaType, item.id],
    queryFn: async () => {
      const { data } = await axios.get<MediaItem>(
        `https://api.themoviedb.org/3/${mediaType}/${item.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      );

      return data;
    },
    enabled: open
  });

  const combinedData = {
    ...item,
    ...detailData
  };

  const getGenreNames = (genreIds: number[]): string => {
    return genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(' | ');
  };

  const handleCastClick = (cast: Cast) => {
    setSelectedCast(cast);
    setView('cast');
  };

  const handleClose = () => {
    setSelectedCast(null);
    setView('movie');
    onOpenChange(false);
  };

  const handleBack = () => {
    if (view === 'cast') {
      setView('movie');
      setSelectedCast(null);
    } else {
      handleClose();
    }
  };

  const displayTitle =
    combinedData.original_title ??
    combinedData.title ??
    combinedData.original_name ??
    combinedData.name;

  const releaseYear = (combinedData.release_date ?? combinedData.first_air_date)?.split('-')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='!w-screen !h-screen !max-w-none !max-h-none bg-black text-white border-none p-0 overflow-y-auto'>
        <DialogHeader className='sticky top-0 bg-black z-50 py-4 px-6 border-b border-gray-800'>
          <div className='flex items-center justify-between'>
            <Button variant='ghost' className='text-white hover:bg-gray-800' onClick={handleBack}>
              <ArrowLeft className='h-5 w-5 mr-2' />
              Back
            </Button>
            <DialogTitle className='text-2xl font-bold truncate max-w-xl'>
              {view === 'movie' ? displayTitle : selectedCast?.name}
            </DialogTitle>
            <div className='w-24' />
          </div>
        </DialogHeader>

        {view === 'movie' ? (
          <div className='space-y-8 px-6 pb-10 w-full max-w-full'>
            {/* Detail Info */}
            <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
              <div className='w-full md:w-1/3 relative aspect-[2/3] rounded-xl overflow-hidden'>
                {combinedData.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${combinedData.poster_path}`}
                    alt={displayTitle ?? 'Poster'}
                    fill
                    className='object-contain'
                  />
                ) : (
                  <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                    <span className='text-gray-500'>No Image Available</span>
                  </div>
                )}
              </div>

              <div className='w-full md:w-2/3 space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tight text-white'>{displayTitle}</h1>
                  <div className='flex flex-wrap gap-2 pt-1'>
                    <div className='text-sm text-gray-300'>
                      {getGenreNames(combinedData.genre_ids)}
                    </div>
                    {releaseYear && (
                      <>
                        <span className='text-gray-500'>•</span>
                        <div className='text-sm text-gray-300'>{releaseYear}</div>
                      </>
                    )}
                    {combinedData.runtime && (
                      <>
                        <span className='text-gray-500'>•</span>
                        <div className='text-sm text-gray-300'>
                          {Math.floor(combinedData.runtime / 60)}h {combinedData.runtime % 60}m
                        </div>
                      </>
                    )}
                  </div>

                  <div className='flex items-center gap-4 pt-2'>
                    <StarRating rating={combinedData.vote_average} max={10} />
                    <div className='text-gray-300'>{combinedData.vote_average.toFixed(1)}/10</div>
                  </div>

                  <div className='flex flex-wrap gap-4 pt-2'>
                    <div className='text-gray-300'>
                      <span className='text-gray-500'>Popularity:</span>{' '}
                      <span
                        className={combinedData.popularity > 60 ? 'text-red-500' : 'text-green-500'}
                      >
                        {combinedData.popularity.toFixed(0)}
                      </span>
                    </div>
                    <div className='text-gray-300'>
                      <span className='text-gray-500'>Votes:</span> {combinedData.vote_count}
                    </div>
                  </div>
                </div>

                <div className='pt-4'>
                  <h2 className='text-xl font-bold text-white mb-3'>Overview</h2>
                  <p className='text-gray-300 leading-relaxed'>
                    {combinedData.overview ?? 'No overview available.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cast */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-white'>Cast</h2>
              {castData && castData.length > 0 ? (
                <Carousel
                  opts={{
                    align: 'start',
                    slidesToScroll: 2
                  }}
                  className='w-full'
                >
                  <CarouselContent className='-ml-2 md:-ml-4'>
                    {castData.map((cast) => (
                      <CarouselItem key={cast.id} className='basis-auto md:basis-1/6 lg:basis-1/8'>
                        <div
                          role='button'
                          tabIndex={0}
                          className='group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'
                          onClick={() => handleCastClick(cast)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCastClick(cast)}
                        >
                          {cast.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                              alt={cast.name}
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
                            <p className='font-bold text-white truncate'>{cast.name}</p>
                            <p className='text-gray-300 text-sm truncate'>as {cast.character}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className='left-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
                  <CarouselNext className='right-2 bg-black/60 border-white/10 text-white hover:bg-black/80 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-200 w-10 h-10 disabled:opacity-30' />
                </Carousel>
              ) : (
                <div className='text-center py-8 text-gray-400 bg-gray-900 rounded-lg'>
                  No cast information available
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-white'>Reviews</h2>
              {reviewData && reviewData.length > 0 ? (
                <div className='space-y-4'>
                  {reviewData.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className='bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-800'
                    >
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='bg-purple-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-white'>
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <span className='font-bold text-gray-200'>{review.author}</span>
                      </div>
                      <p className='text-gray-400 line-clamp-3 mb-4'>{review.content}</p>
                      <a
                        href={review.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-purple-500 hover:text-purple-400 transition-colors font-medium'
                      >
                        Read full review ↗
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8 text-gray-400 bg-gray-900 rounded-lg'>
                  No reviews available
                </div>
              )}
            </div>
          </div>
        ) : (
          selectedCast && <CastDetailContent cast={selectedCast} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetail;
