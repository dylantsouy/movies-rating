'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import StarRating from '@/components/star-rating';

import type { Cast, MediaItem, Review, Video } from '@/types/tmdb';
import type { Genre } from '@/lib/utils';

type MediaType = 'movie' | 'tv';

const MovieDetailPage = ({ params }: { params: Promise<{ mediaType: MediaType; id: string }> }) => {
  const { mediaType, id } = use(params);
  const mediaId = parseInt(id);

  const { data: genres } = useQuery<Genre[]>({
    queryKey: ['genres', mediaType],
    queryFn: async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const { data } = await axios.get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`
      );

      return data.genres;
    },
    staleTime: 1000 * 60 * 60
  });

  const fetchMediaDetail = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<MediaItem>(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${apiKey}&language=en-US`
    );

    return data;
  };

  const fetchCast = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<{ cast: Cast[] }>(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${apiKey}`
    );

    return data.cast.filter((c) => c.profile_path !== null);
  };

  const fetchReviews = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<{ results: Review[] }>(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?api_key=${apiKey}`
    );

    return data.results;
  };

  const fetchVideos = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const { data } = await axios.get<{ results: Video[] }>(
      `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${apiKey}&language=en-US`
    );

    return data.results.filter(
      (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
    );
  };

  const detailQuery = useQuery<MediaItem>({
    queryKey: ['detail', mediaType, mediaId],
    queryFn: fetchMediaDetail
  });

  const castQuery = useQuery<Cast[]>({
    queryKey: ['cast', mediaType, mediaId],
    queryFn: fetchCast
  });

  const reviewQuery = useQuery<Review[]>({
    queryKey: ['reviews', mediaType, mediaId],
    queryFn: fetchReviews
  });

  const videosQuery = useQuery<Video[]>({
    queryKey: ['videos', mediaType, mediaId],
    queryFn: fetchVideos
  });

  const getGenreNames = (genreIds: number[]): string => {
    if (!genres || genres.length === 0) return '';

    return genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(' | ');
  };

  const displayTitle =
    detailQuery.data?.original_title ??
    detailQuery.data?.title ??
    detailQuery.data?.original_name ??
    detailQuery.data?.name;

  const releaseYear = (detailQuery.data?.release_date ?? detailQuery.data?.first_air_date)?.split(
    '-'
  )[0];

  if (
    detailQuery.isLoading ||
    castQuery.isLoading ||
    reviewQuery.isLoading ||
    videosQuery.isLoading ||
    !genres
  ) {
    return (
      <div className='min-h-screen bg-black text-white pb-20'>
        <div className='sticky top-0 bg-black z-50 py-4 px-6 border-b border-gray-800'>
          <Button variant='ghost' className='text-white hover:bg-gray-800 animate-pulse'>
            <div className='h-5 w-5 mr-2 bg-gray-700 rounded'></div>
            <div className='h-4 w-16 bg-gray-700 rounded'></div>
          </Button>
        </div>

        <div className='space-y-8 px-6 pt-6'>
          {/* Skeleton for main content */}
          <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
            <div className='w-full md:w-1/3 relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 animate-pulse'></div>

            <div className='w-full md:w-2/3 space-y-4'>
              <div className='space-y-2'>
                <div className='h-8 w-60 bg-gray-800 rounded animate-pulse'></div>
                <div className='flex gap-2 mt-4 items-center'>
                  <span className='text-gray-800'>•</span>
                  <div className='h-4 w-15 bg-gray-800 rounded animate-pulse'></div>
                </div>
                <div className='flex gap-2 mt-5'>
                  <div className='h-6 w-25 bg-gray-800 rounded animate-pulse'></div>
                  <div className='h-6 w-12 bg-gray-800 rounded animate-pulse'></div>
                </div>
                <div className='flex gap-2 mt-5'>
                  <div className='h-6 w-25 bg-gray-800 rounded animate-pulse'></div>
                  <div className='h-6 w-25 bg-gray-800 rounded animate-pulse'></div>
                </div>
              </div>

              <div className='pt-4'>
                <div className='h-6 w-22 bg-gray-800 rounded animate-pulse mb-3'></div>
                <div className='mt-2 h-5 w-full bg-gray-800 rounded animate-pulse mb-2'></div>
                <div className='mt-2 h-5 w-full bg-gray-800 rounded animate-pulse mb-2'></div>
                <div className='mt-2 h-5 w-full bg-gray-800 rounded animate-pulse mb-2'></div>
                <div className='mt-2 h-5 w-full bg-gray-800 rounded animate-pulse mb-2'></div>
                <div className='mt-2 h-5 w-full bg-gray-800 rounded animate-pulse mb-2'></div>
                <div className='mt-2 h-5 w-3/4 bg-gray-800 rounded animate-pulse'></div>
              </div>
            </div>
          </div>

          {/* Skeleton for cast */}
          <div className='space-y-4'>
            <div className='h-6 w-1/4 bg-gray-800 rounded animate-pulse'></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className='aspect-[3/4] bg-gray-800 rounded-lg animate-pulse'></div>
              ))}
            </div>
          </div>

          {/* Skeleton for trailers */}
          <div className='space-y-4'>
            <div className='h-6 w-1/4 bg-gray-800 rounded animate-pulse'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className='aspect-video bg-gray-800 rounded-lg animate-pulse'></div>
              ))}
            </div>
          </div>

          {/* Skeleton for reviews */}
          <div className='space-y-4'>
            <div className='h-6 w-1/4 bg-gray-800 rounded animate-pulse'></div>
            <div className='space-y-4'>
              {Array.from({ length: 2 }, (_, i) => (
                <div
                  key={i}
                  className='bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-800'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='bg-gray-800 rounded-full w-10 h-10 animate-pulse'></div>
                    <div className='h-4 w-1/4 bg-gray-800 rounded animate-pulse'></div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-4 w-full bg-gray-800 rounded animate-pulse'></div>
                    <div className='h-4 w-4/5 bg-gray-800 rounded animate-pulse'></div>
                    <div className='h-4 w-3/4 bg-gray-800 rounded animate-pulse'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white pb-20'>
      <div className='sticky top-0 bg-black z-50 py-4 px-6 border-b border-gray-800'>
        <Link href={`/${mediaType === 'movie' ? 'movies' : 'tv-shows'}`}>
          <Button variant='ghost' className='text-white'>
            <ArrowLeft className='h-5 w-5 mr-2' />
            Back
          </Button>
        </Link>
      </div>

      <div className='space-y-8 px-6 pt-6'>
        <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
          <div className='w-full md:w-1/3 relative aspect-[2/3] rounded-xl overflow-hidden'>
            {detailQuery.data?.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${detailQuery.data.poster_path}`}
                alt={displayTitle ?? 'Poster'}
                fill
                className='object-cover'
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
                  {getGenreNames(detailQuery.data?.genre_ids ?? [])}
                </div>
                {releaseYear && (
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-500'>•</span>
                    <div className='text-sm text-gray-300'>{releaseYear}</div>
                  </div>
                )}
                {detailQuery.data?.runtime && (
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-500'>•</span>
                    <div className='text-sm text-gray-300'>
                      {Math.floor(detailQuery.data.runtime / 60)}h {detailQuery.data.runtime % 60}m
                    </div>
                  </div>
                )}
              </div>

              <div className='flex items-center gap-4 pt-2'>
                <StarRating rating={detailQuery.data?.vote_average ?? 0} max={10} />
                <div className='text-gray-300'>
                  {(detailQuery.data?.vote_average ?? 0).toFixed(1)}/10
                </div>
              </div>

              <div className='flex flex-wrap gap-4 pt-2'>
                <div className='text-gray-300'>
                  <span className='text-gray-500'>Popularity:</span>{' '}
                  <span
                    className={
                      (detailQuery.data?.popularity ?? 0) > 60 ? 'text-red-500' : 'text-green-500'
                    }
                  >
                    {(detailQuery.data?.popularity ?? 0).toFixed(0)}
                  </span>
                </div>
                <div className='text-gray-300'>
                  <span className='text-gray-500'>Votes:</span> {detailQuery.data?.vote_count}
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <h2 className='text-xl font-bold text-white mb-3'>Overview</h2>
              <p className='text-gray-300 leading-relaxed'>
                {detailQuery.data?.overview ?? 'No overview available.'}
              </p>
            </div>
          </div>
        </div>

        {/* Trailers Section */}
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-white'>Trailers & Videos</h2>
          {videosQuery.data && videosQuery.data.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {videosQuery.data.slice(0, 2).map((video) => (
                <div key={video.id} className='aspect-video w-full'>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    className='w-full h-full rounded-lg'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-400 bg-gray-900 rounded-lg'>
              No trailers available
            </div>
          )}
        </div>

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-white'>Cast</h2>
          {castQuery.data && castQuery.data.length > 0 ? (
            <Carousel
              opts={{
                align: 'start',
                slidesToScroll: 2
              }}
              className='w-full'
            >
              <CarouselContent className='-ml-2 md:-ml-4'>
                {castQuery.data.map((cast) => (
                  <CarouselItem key={cast.id} className='basis-auto md:basis-1/6 lg:basis-1/8'>
                    <Link href={`/detail/person/${cast.id}`}>
                      <div className='group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'>
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
                    </Link>
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

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-white'>Reviews</h2>
          {reviewQuery.data && reviewQuery.data.length > 0 ? (
            <div className='space-y-4'>
              {reviewQuery.data.slice(0, 3).map((review) => (
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
    </div>
  );
};

export default MovieDetailPage;
