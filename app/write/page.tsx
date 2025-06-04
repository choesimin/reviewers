'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Star, Upload, X } from 'lucide-react'

export default function WriteReviewPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [target, setTarget] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [category, setCategory] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [images] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const handleTagRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement review submission
      console.log({
        title,
        content,
        target,
        rating,
        tags,
        category,
        isAnonymous,
        images,
      })
      
      router.push('/')
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none"
      >
        <Star
          className={`h-8 w-8 transition-colors ${
            i < (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 hover:text-yellow-400'
          }`}
        />
      </button>
    ))
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">리뷰 작성하기</h1>
          <p className="text-muted-foreground">
            여러분의 경험을 솔직하게 공유해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="리뷰 제목을 입력하세요"
            />
          </div>

          {/* 리뷰 대상 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              리뷰 대상 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="제품명, 음식점명, 서비스명 등"
            />
          </div>

          {/* 평점 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              평점 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="ml-3 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : '평점을 선택하세요'}
              </span>
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">카테고리 선택</option>
              <option value="전자제품">전자제품</option>
              <option value="음식점">음식점</option>
              <option value="엔터테인먼트">엔터테인먼트</option>
              <option value="여행">여행</option>
              <option value="패션">패션</option>
              <option value="도서">도서</option>
              <option value="서비스">서비스</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="리뷰 내용을 자세히 작성해주세요. 마크다운 문법을 사용할 수 있습니다."
            />
          </div>

          {/* 태그 */}
          <div>
            <label className="block text-sm font-medium mb-2">태그</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="태그를 입력하고 Enter를 누르세요"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium mb-2">이미지</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                이미지를 드래그하거나 클릭하여 업로드하세요
              </p>
              <Button type="button" variant="outline">
                파일 선택
              </Button>
            </div>
          </div>

          {/* 익명 설정 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="anonymous" className="text-sm">
              익명으로 작성하기
            </label>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={loading || !title || !content || !target || rating === 0}
            >
              {loading ? '등록 중...' : '리뷰 등록'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
