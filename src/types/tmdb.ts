// 基本媒體類型
export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  runtime?: number;
  character?: string;
}

// 電影詳情擴展
export interface MovieDetail extends MediaItem {
  credits?: Credits;
  reviews?: Review[];
}

// 演員類型
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  birthday?: string;
  place_of_birth?: string;
  biography?: string;
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
