'use client'

import { ReviewCard } from '@/components/review/review-card'
import { Button } from '@/components/ui/button'
import { PlusCircle, TrendingUp, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock data for now
const mockReviews = [
  {
    id: '1',
    user_id: '1',
    title: 'MacBook Pro M3 Max 사용 후기',
    content: '개발용으로 구매한 MacBook Pro M3 Max 모델을 한 달 정도 사용해본 솔직한 후기입니다. 성능은 정말 만족스럽고, 특히 컴파일 속도가 이전 모델 대비 2배 이상 빨라진 것 같습니다.',
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
  },
  {
    id: '2',
    user_id: '2',
    title: '서울 강남 맛집 - 정담화',
    content: '점심시간에 방문했는데 웨이팅이 있었지만 음식이 나오기까지는 빨랐습니다. 갈비탕이 정말 맛있고 고기도 부드러워요. 다만 가격이 조금 비싼 편입니다.',
    target: '정담화 강남점',
    rating: 4,
    tags: ['한식', '갈비탕', '강남', '점심'],
    category: '음식점',
    image_urls: [
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3'
    ],
    is_anonymous: false,
    view_count: 892,
    created_at: '2024-11-30T14:30:00Z',
    updated_at: '2024-11-30T14:30:00Z',
    user: {
      id: '2',
      email: 'user2@example.com',
      username: 'foodie_kim',
      avatar_url: null,
      created_at: '2024-10-15T00:00:00Z'
    },
    likes_count: 23,
    comments_count: 8,
    is_liked: true
  },
  {
    id: '3',
    user_id: '3',
    title: '넷플릭스 오리지널 시리즈 추천',
    content: '최근에 본 넷플릭스 오리지널 중에서 가장 재미있었던 작품입니다. 스토리 전개가 빠르고 연기도 훌륭해요.',
    target: '스트레인저 씽스 시즌 4',
    rating: 4,
    tags: ['넷플릭스', '드라마', 'SF', '추천'],
    category: '엔터테인먼트',
    image_urls: [],
    is_anonymous: true,
    view_count: 567,
    created_at: '2024-11-29T20:15:00Z',
    updated_at: '2024-11-29T20:15:00Z',
    user: {
      id: '3',
      email: 'user3@example.com',
      username: 'drama_lover',
      avatar_url: null,
      created_at: '2024-09-20T00:00:00Z'
    },
    likes_count: 18,
    comments_count: 5,
    is_liked: false
  }
]

type SortOption = 'latest' | 'popular' | 'rating'

export default function Home() {
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  const getSortedReviews = () => {
    const reviews = [...mockReviews]
    switch (sortBy) {
      case 'popular':
        return reviews.sort((a, b) => b.likes_count - a.likes_count)
      case 'rating':
        return reviews.sort((a, b) => b.rating - a.rating)
      case 'latest':
      default:
        return reviews.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
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
              <Link href="/write">
                <Button size="lg" className="w-full sm:w-auto">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  첫 리뷰 작성하기
                </Button>
              </Link>
              <Link href="/requests">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  리뷰 요청 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">최신 리뷰</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === 'latest' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>최신순</span>
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === 'popular' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>인기순</span>
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  sortBy === 'rating' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Star className="h-4 w-4" />
                <span>평점순</span>
              </button>
            </div>
          </div>

          {/* Reviews Feed */}
          <div className="space-y-6">
            {getSortedReviews().map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Load More */}
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
