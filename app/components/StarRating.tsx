'use client';

import { useState } from 'react';
import { useTheme } from '../layout';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  interactive = true
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { isDarkMode } = useTheme();

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl transition-colors ${
            interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
          } ${
            star <= (hoverRating || rating) 
              ? 'text-yellow-400' 
              : isDarkMode ? 'text-gray-600' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          {star <= (hoverRating || rating) ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
