'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import StarRating from './start-rating';

import type { CastDetail, CastCredit } from '@/types/tmdb';

type CastDetailDialogProps = {
  cast: CastDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CastDetailDialog = ({ cast, open, onOpenChange }: CastDetailDialogProps) => {
  // 获取演员参与的作品
  const { data: credits, isLoading } = useQuery<CastCredit[]>({
    queryKey: ['castCredits', cast.id],
    queryFn: async () => {
      const { data } = await axios.get<{ cast: CastCredit[] }>(
        `https://api.themoviedb.org/3/person/${cast.id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      return data.cast.filter((item) => item.poster_path !== null);
    },
    enabled: open
  });

  // 出生日期格式化为年龄
  const formatBirthDate = (birthday: string | undefined) => {
    if (!birthday) return null;

    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return `${age - 1} years old`;
    }

    return `${age} years old`;
  };

  // 关闭处理
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-6xl bg-black text-white border-gray-800 overflow-y-auto max-h-screen p-0'>
        <DialogHeader className='sticky top-0 bg-black z-50 py-4 px-6 border-b border-gray-800'>
          <div className='flex items-center justify-between'>
            <Button variant='ghost' className='text-white hover:bg-gray-800' onClick={handleClose}>
              <ArrowLeft className='h-5 w-5 mr-2' />
              Back
            </Button>
            <DialogTitle className='text-2xl font-bold truncate max-w-xl'>{cast.name}</DialogTitle>
            <div className='w-24' />
          </div>
        </DialogHeader>

        <div className='space-y-8 px-6 pb-10'>
          <div className='flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg'>
            <div className='w-full md:w-1/3 relative aspect-[3/4] rounded-xl overflow-hidden'>
              {cast.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt={cast.name}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                  <span className='text-gray-500'>No Photo Available</span>
                </div>
              )}
            </div>

            <div className='w-full md:w-2/3 space-y-4'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>{cast.name}</h1>

              <div className='space-y-3'>
                {cast.birthday && (
                  <div className='text-gray-300'>
                    <span className='text-gray-500'>Born:</span>{' '}
                    {new Date(cast.birthday).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}{' '}
                    ({formatBirthDate(cast.birthday)})
                  </div>
                )}

                {cast.place_of_birth && (
                  <div className='text-gray-300'>
                    <span className='text-gray-500'>From:</span> {cast.place_of_birth}
                  </div>
                )}
              </div>

              <div className='pt-4'>
                <h2 className='text-xl font-bold text-white mb-3'>Biography</h2>
                <p className='text-gray-300 leading-relaxed whitespace-pre-line'>
                  {cast.biography ?? 'No biography available.'}
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-white'>Acted In</h2>

            {isLoading ? (
              <div className='flex justify-center py-10'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
              </div>
            ) : credits && credits.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {credits.map((credit) => (
                  <div
                    key={credit.id}
                    className='bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-purple-500 transition-colors'
                  >
                    <div className='flex flex-col md:flex-row'>
                      <div className='w-full md:w-1/3 relative aspect-[2/3]'>
                        {credit.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                            alt={credit.title ?? credit.name ?? 'Movie Poster'}
                            fill
                            className='object-cover'
                          />
                        ) : (
                          <div className='bg-gray-800 w-full h-full flex items-center justify-center'>
                            <span className='text-gray-500 text-sm'>No Image</span>
                          </div>
                        )}
                      </div>

                      <div className='w-full md:w-2/3 p-4'>
                        <h3 className='font-bold text-white text-lg truncate'>
                          {credit.title ?? credit.name ?? 'Untitled'}
                        </h3>

                        {credit.character && (
                          <p className='text-gray-400 text-sm mt-1'>
                            as <span className='text-purple-300'>{credit.character}</span>
                          </p>
                        )}

                        <div className='mt-3'>
                          {credit.vote_average !== undefined && (
                            <div className='flex items-center gap-2 mt-2'>
                              <StarRating rating={credit.vote_average} max={10} size={16} />
                              <span className='text-gray-400 text-sm'>
                                {credit.vote_average.toFixed(1)}
                              </span>
                            </div>
                          )}

                          {credit.release_date && (
                            <p className='text-gray-500 text-sm mt-1'>
                              {new Date(credit.release_date).getFullYear() ?? 'N/A'}
                            </p>
                          )}
                        </div>

                        {credit.overview && (
                          <p className='text-gray-400 text-sm mt-3 line-clamp-3'>
                            {credit.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-400 bg-gray-900 rounded-lg'>
                No acting credits available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CastDetailDialog;
