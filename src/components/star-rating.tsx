'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  max: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 10, size = 20 }) => {
  const normalizedRating = (rating / max) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='relative' style={{ width: size, height: size }}>
          {index < fullStars ? (
            <svg
              width={size}
              height={size}
              viewBox='0 0 24 24'
              fill='#facc15'
              stroke='#facc15'
              strokeWidth='2'
            >
              <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
            </svg>
          ) : index === fullStars && hasHalfStar ? (
            <>
              <svg
                width={size}
                height={size}
                viewBox='0 0 24 24'
                fill='#d1d5db'
                stroke='#d1d5db'
                strokeWidth='2'
              >
                <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
              </svg>
              <div className='absolute inset-0 overflow-hidden w-1/2'>
                <svg
                  width={size}
                  height={size}
                  viewBox='0 0 24 24'
                  fill='#facc15'
                  stroke='#facc15'
                  strokeWidth='2'
                  className='absolute left-0'
                >
                  <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
                </svg>
              </div>
            </>
          ) : (
            <svg
              width={size}
              height={size}
              viewBox='0 0 24 24'
              fill='none'
              stroke='#d1d5db'
              strokeWidth='2'
            >
              <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
