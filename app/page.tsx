'use client';

import { useState } from 'react';
import StarRating from './components/StarRating';
import ReviewCard from './components/ReviewCard';
import { useTheme } from './layout';

interface Review {
  id: number;
  itemName: string;
  content: string;
  rating: number;
  date: string;
  author: string;
}

export default function Home() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemName = formData.get('itemName') as string;
    const reviewContent = formData.get('reviewContent') as string;

    if (selectedRating === 0) {
      alert('별점을 선택해주세요!');
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      itemName,
      content: reviewContent,
      rating: selectedRating,
      date: new Date().toLocaleDateString('ko-KR'),
      author: '익명'
    };

    setReviews(prev => [newReview, ...prev]);
    setSelectedRating(0);
    (e.target as HTMLFormElement).reset();
    alert('리뷰가 등록되었습니다!');
    setActiveSection('reviews');
  };

  const handleRequestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemName = formData.get('requestItemName') as string;
    const description = formData.get('requestDescription') as string;
    const link = formData.get('requestLink') as string;

    console.log('리뷰 요청:', { itemName, description, link });
    (e.target as HTMLFormElement).reset();
    alert('리뷰 요청이 등록되었습니다!');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className={`border-b ${isDarkMode ? 'border-yellow-400/20' : 'border-yellow-400/30'}`}>
        <nav className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveSection('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-xl font-bold text-yellow-400">Reviewers</span>
            </button>
            
            <div className="flex items-center gap-8">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`text-xl transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-400'
                }`}
                title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {isDarkMode ? '☀' : '☾'}
              </button>
              
              {[
                { key: 'reviews', label: '리뷰' },
                { key: 'submit', label: '작성' },
                { key: 'request', label: '요청' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`transition-colors ${
                    activeSection === key
                      ? 'text-yellow-400'
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Home Section */}
        {activeSection === 'home' && (
          <div className="text-center">
            <div className="mb-8">
              <span className="text-yellow-400 text-6xl block mb-4">★</span>
              <h1 className="text-4xl font-bold mb-4">무엇이든 리뷰하세요</h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                자유롭게 리뷰하고, 리뷰받고 싶은 것을 등록하는 커뮤니티
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActiveSection('submit')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                리뷰 작성하기
              </button>
              <button
                onClick={() => setActiveSection('request')}
                className={`border px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                    : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                }`}
              >
                리뷰 요청하기
              </button>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">최근 리뷰</h2>
            {reviews.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-yellow-400 text-4xl block mb-4">📝</span>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>아직 등록된 리뷰가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit Review Section */}
        {activeSection === 'submit' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">리뷰 작성</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">리뷰할 대상</label>
                <input
                  type="text"
                  name="itemName"
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 focus:border-yellow-400'
                      : 'bg-white border-gray-300 focus:border-yellow-400'
                  }`}
                  placeholder="리뷰할 대상을 입력하세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">리뷰 내용</label>
                <textarea
                  name="reviewContent"
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none resize-none transition-colors ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 focus:border-yellow-400'
                      : 'bg-white border-gray-300 focus:border-yellow-400'
                  }`}
                  placeholder="리뷰 내용을 작성해주세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">별점</label>
                <StarRating
                  rating={selectedRating}
                  onRatingChange={setSelectedRating}
                />
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                리뷰 등록
              </button>
            </form>
          </div>
        )}

        {/* Request Review Section */}
        {activeSection === 'request' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">리뷰 요청</h2>
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">리뷰받고 싶은 대상</label>
                <input
                  type="text"
                  name="requestItemName"
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 focus:border-yellow-400'
                      : 'bg-white border-gray-300 focus:border-yellow-400'
                  }`}
                  placeholder="리뷰받고 싶은 대상을 입력하세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">설명</label>
                <textarea
                  name="requestDescription"
                  required
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none resize-none transition-colors ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 focus:border-yellow-400'
                      : 'bg-white border-gray-300 focus:border-yellow-400'
                  }`}
                  placeholder="설명을 추가해주세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">관련 링크 (선택사항)</label>
                <input
                  type="url"
                  name="requestLink"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 focus:border-yellow-400'
                      : 'bg-white border-gray-300 focus:border-yellow-400'
                  }`}
                  placeholder="https://example.com"
                />
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                리뷰 요청
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
