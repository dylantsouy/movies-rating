// 基本媒體類型
export interface MediaItem {
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
  overview?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

// 電影詳情擴展
export interface MovieDetail extends MediaItem {
  credits?: Credits;
  reviews?: Review[];
}

// 演員類型
export interface Cast {
  adult: boolean;
  gender: number; // 1 = female, 2 = male, 0 = unspecified
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;

  // Person-specific details (from /person/{id} endpoint)
  also_known_as?: string[];
  biography?: string;
  birthday?: string; // YYYY-MM-DD
  deathday?: string | null; // YYYY-MM-DD
  homepage?: string | null;
  imdb_id?: string;
  place_of_birth?: string;
  combined_credits?: {
    cast: CastCredit[];
  };

  // Additional details sometimes available
  movie_credits?: {
    cast: CastCredit[];
  };
  tv_credits?: {
    cast: CastCredit[];
  };
  images?: {
    profiles: Image[];
  };
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

// 劇組成員類型
export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
}

// 演職員表
export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

// 評論類型
export interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}

// 演員詳情類型
export interface CastDetail {
  id: number;
  name: string;
  birthday?: string;
  deathday?: string | null;
  biography?: string;
  place_of_birth?: string;
  profile_path?: string;
}

// 演員作品類型
export interface CastCredit {
  id: number;
  title?: string;
  name?: string;
  character?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  media_type: string;
}

// 演員所有作品
export interface CastCredits {
  cast: CastCredit[];
}

// 類型/流派
export interface Genre {
  id: number;
  name: string;
}

// 電影影片類型
type VideoType =
  | 'Trailer' // Official trailers
  | 'Teaser' // Shorter previews
  | 'Clip' // Short clips from the movie/show
  | 'Featurette' // Behind-the-scenes or making-of
  | 'Behind the Scenes' // Production footage
  | 'Bloopers' // Bloopers or outtakes
  | 'Recap' // Episode recaps
  | 'Opening Credits' // Special opening sequences
  | 'Interview'; // Cast/crew interviews

// 電影影片
export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string;
}
