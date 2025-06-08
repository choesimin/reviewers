'use client'

import Link from 'next/link'
import { Review, User } from '@/types/database'
import { Heart, MessageCircle, Eye, Star } from 'lucide-react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface ReviewCardProps {
  review: Review & {
    user: User
    likes_count: number
    comments_count: number
    is_liked: boolean
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(review.is_liked)
  const [likesCount, setLikesCount] = useState(review.likes_count)

  const handleLike = async () => {
    // TODO: Implement like functionality
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-primary text-primary' 
            : 'text-muted-foreground'
        }`}
      />
    ))
  }

  return (
    <article className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            {review.user.avatar_url ? (
              <img
                src={review.user.avatar_url}
                alt={review.user.username || 'Anonymous'}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium">
                {review.is_anonymous 
                  ? '익명' 
                  : (review.user.username?.[0]?.toUpperCase() || 'U')
                }
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-sm">
              {review.is_anonymous ? '익명' : review.user.username}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.created_at), {
                addSuffix: true,
                locale: ko
              })}
            </p>
          </div>
        </div>
        
        {/* Category */}
        {review.category && (
          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {review.category}
          </span>
        )}
      </div>

      {/* Content */}
      <Link href={`/review/${review.id}`} className="block">
        <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
          {review.title}
        </h3>
        
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(review.rating)}
          <span className="text-sm text-muted-foreground ml-2">
            {review.rating}/5
          </span>
        </div>

        <p className="text-muted-foreground mb-3 line-clamp-3">
          {review.content.slice(0, 150)}
          {review.content.length > 150 && '...'}
        </p>

        {/* Target */}
        <div className="mb-3">
          <span className="text-sm text-muted-foreground">리뷰 대상: </span>
          <span className="text-sm font-medium">{review.target}</span>
        </div>

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {review.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Images */}
        {review.image_urls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {review.image_urls.slice(0, 3).map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={url}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {index === 2 && review.image_urls.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">
                      +{review.image_urls.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              isLiked 
                ? 'text-red-500' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>
          
          <Link
            href={`/review/${review.id}#comments`}
            className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{review.comments_count}</span>
          </Link>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{review.view_count}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
