'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReviewCard } from '@/components/review/review-card'
import { PlusCircle, TrendingUp, Clock, Star } from 'lucide-react'

// Mock data
const mockReviews = [
  {
    id: '1',
    user_id: '1',
    title: 'MacBook Pro M3 Max 사용 후기',
    content: '개발용으로 구매한 MacBook Pro M3 Max 모델을 한 달 정도 사용해본 솔직한 후기입니다.',
    target: 'MacBook Pro M3 Max 14인치',
    rating: 5,
    tags: ['노트북', '애플', '개발도구', 'M3'],
    category: '전자제품',
    image_urls: ['https://picsum.photos/400/300?random=1'],
    is_anonymous: false,
    view_count: 1234,
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    user: {
      id: '1',
      email: 'user1@example.com',
      username: 'tech_reviewer',
      avatar_url: null,
      created_at: '2024-11-01T00:00:00Z'
    },
    likes_count: 45,
    comments_count: 12,
    is_liked: false
  }
]

type SortOption = 'latest' | 'popular' | 'rating'

export default function HomePage() {
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              세상의 모든 것을 <br />
              <span className="text-primary">리뷰</span>하는 공간
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              상품, 음식점부터 일상의 사소한 것들까지<br />
              자유롭게 리뷰하고 다른 사람들의 의견을 들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/write">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  첫 리뷰 작성하기
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/requests">
                  리뷰 요청 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">최신 리뷰</h2>
          </div>

          <div className="space-y-6">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              더 많은 리뷰 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
