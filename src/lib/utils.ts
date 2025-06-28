import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';

class MovieAPI {
  private async fetchFromTMDB<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}${
      endpoint.includes('?') ? '&' : '?'
    }api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Movie endpoints
  async getPopularMovies(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular?page=1&region=US');
  }

  async getTopRatedMovies(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/top_rated?page=1&region=US');
  }

  async getUpcomingMovies(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/upcoming?page=1&region=US');
  }

  async getNowPlayingMovies(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/movie/now_playing?page=1&region=US');
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list');
  }

  // TV Show endpoints
  async getPopularTVShows(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/tv/popular?page=1&region=US');
  }

  async getTopRatedTVShows(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/tv/top_rated?page=1&region=US');
  }

  async getOnTheAirTVShows(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/tv/on_the_air?page=1&region=US');
  }

  async getAiringTodayTVShows(): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB<TMDBResponse<Movie>>('/tv/airing_today?page=1&region=US');
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchFromTMDB<{ genres: Genre[] }>('/genre/tv/list');
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const movieAPI = new MovieAPI();
