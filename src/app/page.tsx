'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Star, Calendar, TrendingUp, Clapperboard } from 'lucide-react';

import MovieDetail from '@/components/movie-detail';
import LoadingSkeleton from '@/components/loading-skeleton';
import HeroCarousel from '@/components/hero-carousel';
import MediaSection from '@/components/media-section';
import MediaTop from '@/components/media-top';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

type MediaType = 'movie' | 'tv';

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

interface TMDBResponse<T> {
  results: T[];
}

interface SectionConfig {
  title: string;
  endpoint: string;
  icon?: React.ReactNode;
}

const fetchTMDB = async (url: string): Promise<MediaItem[]> => {
  const { data } = await axios.get<TMDBResponse<MediaItem>>(url);
  return data.results.filter((item) => item.backdrop_path);
};

const buildApiUrl = (mediaType: MediaType, endpoint: string): string => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  return `${TMDB_BASE_URL}/${mediaType}/${endpoint}?api_key=${apiKey}&language=en-US&page=1&region=US`;
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

const useMediaData = (mediaType: MediaType) => {
  const sections: SectionConfig[] = useMemo(
    () => [
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
    ],
    [mediaType]
  );

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
    queryKey: ['upcoming', mediaType],
    queryFn: () => {
      const endpoint = mediaType === 'movie' ? 'upcoming' : 'on_the_air';
      return fetchTMDB(buildApiUrl(mediaType, endpoint));
    },
    staleTime: 1000 * 60 * 30
  });

  const nowPlayingQuery = useQuery({
    queryKey: ['nowPlaying', mediaType],
    queryFn: () => {
      const endpoint = mediaType === 'movie' ? 'now_playing' : 'airing_today';
      return fetchTMDB(buildApiUrl(mediaType, endpoint));
    },
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

const Home = () => {
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: genres } = useGenres(mediaType);
  const { sections, topRated, popular, upcoming, nowPlaying, isLoading } = useMediaData(mediaType);

  const toggleMediaType = () => {
    setMediaType((prev) => (prev === 'movie' ? 'tv' : 'movie'));
  };

  const openDetail = (item: MediaItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  if (!isMounted || isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='relative w-full'>
        {topRated && topRated.length > 0 && (
          <div className='relative'>
            <HeroCarousel items={topRated} genres={genres} onItemClick={openDetail} />
            <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none' />
          </div>
        )}

        <div className='relative -mt-32 z-10'>
          <div className='max-w-none px-6 sm:px-8 lg:px-12'>
            <MediaTop
              title='Top 10'
              items={popular}
              genres={genres}
              onItemClick={openDetail}
              icon={<TrendingUp className='w-4 h-4' />}
            />
          </div>
        </div>
      </div>

      <div className='max-w-none px-8 sm:px-8 lg:px-12 pb-8'>
        <MediaSection
          title={sections[2].title}
          items={upcoming}
          genres={genres}
          onItemClick={openDetail}
          icon={sections[2].icon}
        />
        <MediaSection
          title={sections[3].title}
          items={nowPlaying}
          genres={genres}
          onItemClick={openDetail}
          icon={sections[3].icon}
        />
        <MediaSection
          title={sections[0].title}
          items={topRated}
          genres={genres}
          onItemClick={openDetail}
          icon={sections[0].icon}
        />
      </div>

      {selectedItem && (
        <MovieDetail
          item={selectedItem}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          genres={genres ?? []}
        />
      )}
    </div>
  );
};

export default Home;
