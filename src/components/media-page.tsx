'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Star, Calendar, TrendingUp, Clapperboard } from 'lucide-react';

import LoadingSkeleton from '@/components/loading-skeleton';
import HeroCarousel from '@/components/hero-carousel';
import MediaSection from '@/components/media-section';
import MediaTop from '@/components/media-top';

import type { Genre, MediaItem } from '@/types/tmdb';

type MediaType = 'movie' | 'tv';

interface TMDBResponse<T> {
  results: T[];
}

interface SectionConfig {
  title: string;
  endpoint: string;
  icon?: React.ReactNode;
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const fetchTMDB = async (url: string): Promise<MediaItem[]> => {
  const { data } = await axios.get<TMDBResponse<MediaItem>>(url);
  return data.results.filter((item) => item.backdrop_path);
};

const buildApiUrl = (mediaType: MediaType, endpoint: string): string => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  return `${TMDB_BASE_URL}/${mediaType}/${endpoint}?api_key=${apiKey}&language=en-US&page=1&region=US`;
};

const buildTrendingUrl = (mediaType: MediaType, timeWindow: 'day' | 'week' = 'week'): string => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  return `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${apiKey}&language=en-US&page=1`;
};

const useGenres = (mediaType: MediaType) => {
  return useQuery<Genre[]>({
    queryKey: ['genres', mediaType],
    queryFn: async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const { data } = await axios.get<{ genres: Genre[] }>(
        `${TMDB_BASE_URL}/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`
      );

      return data.genres;
    },
    staleTime: 1000 * 60 * 60
  });
};

const useHeroData = (mediaType: MediaType) => {
  const trendingQuery = useQuery({
    queryKey: ['trending', mediaType],
    queryFn: () => fetchTMDB(buildTrendingUrl(mediaType, 'week')),
    staleTime: 1000 * 60 * 60
  });

  return {
    heroData: trendingQuery.data,
    isLoading: trendingQuery.isLoading
  };
};

const useMediaData = (mediaType: MediaType) => {
  const sections: SectionConfig[] = [
    { title: 'Top Rated', endpoint: 'top_rated', icon: <Star className='w-4 h-4' /> },
    { title: 'Popular', endpoint: 'popular', icon: <TrendingUp className='w-4 h-4' /> },
    {
      title: mediaType === 'movie' ? 'Upcoming' : 'On The Air',
      endpoint: mediaType === 'movie' ? 'upcoming' : 'on_the_air',
      icon: <Calendar className='w-4 h-4' />
    },
    {
      title: mediaType === 'movie' ? 'Now Playing' : 'Airing Today',
      endpoint: mediaType === 'movie' ? 'now_playing' : 'airing_today',
      icon: <Clapperboard className='w-4 h-4' />
    }
  ];

  const topRatedQuery = useQuery({
    queryKey: ['top_rated', mediaType],
    queryFn: () => fetchTMDB(buildApiUrl(mediaType, 'top_rated')),
    staleTime: 1000 * 60 * 30
  });

  const popularQuery = useQuery({
    queryKey: ['popular', mediaType],
    queryFn: () => fetchTMDB(buildApiUrl(mediaType, 'popular')),
    staleTime: 1000 * 60 * 30
  });

  const upcomingQuery = useQuery({
    queryKey: [mediaType === 'movie' ? 'upcoming' : 'on_the_air', mediaType],
    queryFn: () =>
      fetchTMDB(buildApiUrl(mediaType, mediaType === 'movie' ? 'upcoming' : 'on_the_air')),
    staleTime: 1000 * 60 * 30
  });

  const nowPlayingQuery = useQuery({
    queryKey: [mediaType === 'movie' ? 'now_playing' : 'airing_today', mediaType],
    queryFn: () =>
      fetchTMDB(buildApiUrl(mediaType, mediaType === 'movie' ? 'now_playing' : 'airing_today')),
    staleTime: 1000 * 60 * 30
  });

  return {
    sections,
    topRated: topRatedQuery.data,
    popular: popularQuery.data,
    upcoming: upcomingQuery.data,
    nowPlaying: nowPlayingQuery.data,
    isLoading:
      topRatedQuery.isLoading ||
      popularQuery.isLoading ||
      upcomingQuery.isLoading ||
      nowPlayingQuery.isLoading
  };
};

const MediaPage = ({ mediaType }: { mediaType: MediaType }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: genres } = useGenres(mediaType);
  const { heroData, isLoading: heroLoading } = useHeroData(mediaType);
  const { sections, topRated, popular, upcoming, nowPlaying, isLoading } = useMediaData(mediaType);

  if (!isMounted || isLoading || heroLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='relative w-full'>
        {heroData && heroData.length > 0 && (
          <div className='relative'>
            <HeroCarousel items={heroData} genres={genres} mediaType={mediaType} />
            <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none' />
          </div>
        )}

        <div className='relative -mt-32 z-10'>
          <div className='max-w-none px-6 sm:px-8 lg:px-12'>
            <MediaTop
              title='Top 10'
              items={popular}
              genres={genres}
              icon={<TrendingUp className='w-4 h-4' />}
              mediaType={mediaType}
            />
          </div>
        </div>
      </div>

      <div className='max-w-none px-8 sm:px-8 lg:px-12 pb-8'>
        <MediaSection
          title={sections[2].title}
          items={upcoming}
          genres={genres}
          icon={sections[2].icon}
          mediaType={mediaType}
        />
        <MediaSection
          title={sections[3].title}
          items={nowPlaying}
          genres={genres}
          icon={sections[3].icon}
          mediaType={mediaType}
        />
        <MediaSection
          title={sections[0].title}
          items={topRated}
          genres={genres}
          icon={sections[0].icon}
          mediaType={mediaType}
        />
      </div>
    </div>
  );
};

export default MediaPage;
