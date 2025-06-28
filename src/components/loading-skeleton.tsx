'use client';

import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
  <div className='container mx-auto p-4'>
    <div className='flex justify-end mb-4'>
      <Skeleton className='h-10 w-32' />
    </div>
    <div className='space-y-8'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className='h-8 w-48 mb-4' />
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className='aspect-video rounded-lg' />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
