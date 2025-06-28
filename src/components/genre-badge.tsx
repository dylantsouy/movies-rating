'use client';

import { Badge } from '@/components/ui/badge';

interface GenreBadgeProps {
  genre: string;
  variant?: 'hero' | 'card';
  className?: string;
}

// 為不同類型的電影/電視劇分配顏色
const getGenreColor = (genre: string): string => {
  const genreColors: Record<string, string> = {
    // 動作/冒險類
    Action: 'bg-red-600 hover:bg-red-700 text-white border-red-500',
    Adventure: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-500',
    Thriller: 'bg-red-800 hover:bg-red-900 text-white border-red-700',

    // 劇情類
    Drama: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500',
    Romance: 'bg-pink-600 hover:bg-pink-700 text-white border-pink-500',
    Family: 'bg-green-600 hover:bg-green-700 text-white border-green-500',

    // 喜劇類
    Comedy: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-500',
    Animation: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500',

    // 科幻/奇幻類
    'Science Fiction': 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500',
    Fantasy: 'bg-violet-600 hover:bg-violet-700 text-white border-violet-500',
    Horror: 'bg-gray-800 hover:bg-gray-900 text-white border-gray-700',

    // 其他類型
    Mystery: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500',
    Crime: 'bg-slate-600 hover:bg-slate-700 text-white border-slate-500',
    Documentary: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500',
    History: 'bg-amber-600 hover:bg-amber-700 text-white border-amber-500',
    War: 'bg-stone-600 hover:bg-stone-700 text-white border-stone-500',
    Western: 'bg-orange-800 hover:bg-orange-900 text-white border-orange-700',
    Music: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white border-fuchsia-500',
    'TV Movie': 'bg-teal-600 hover:bg-teal-700 text-white border-teal-500',

    // 電視劇特有類型
    Reality: 'bg-lime-600 hover:bg-lime-700 text-white border-lime-500',
    Talk: 'bg-sky-600 hover:bg-sky-700 text-white border-sky-500',
    News: 'bg-red-700 hover:bg-red-800 text-white border-red-600',
    Soap: 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500',
    Kids: 'bg-green-500 hover:bg-green-600 text-white border-green-400',
    'War & Politics': 'bg-neutral-600 hover:bg-neutral-700 text-white border-neutral-500'
  };

  return genreColors[genre] || 'bg-gray-600 hover:bg-gray-700 text-white border-gray-500';
};

const GenreBadge = ({ genre, variant = 'card', className = '' }: GenreBadgeProps) => {
  const colorClasses = getGenreColor(genre);
  const sizeClasses = variant === 'hero' ? 'text-xs px-2 py-1' : 'text-xs h-5 px-2';

  return (
    <Badge
      className={`${colorClasses} ${sizeClasses} font-medium transition-all duration-200 ${className}`}
    >
      {genre}
    </Badge>
  );
};

export default GenreBadge;
