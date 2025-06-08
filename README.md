# Reviewers - 리뷰 커뮤니티

자유롭게 무언가를 리뷰하고, 리뷰받고 싶은 대상을 등록할 수 있는 커뮤니티 플랫폼입니다.

## 주요 기능

- ⭐ 별점 기반 리뷰 시스템
- 📝 자유로운 리뷰 작성
- 🔍 리뷰 요청 등록
- 📱 반응형 디자인
- 🌙 다크모드 지원
- ✨ 모던하고 세련된 UI/UX

## 디자인 컨셉

- **주요 색상**: 골든 옐로우 (#FFD700, #F59E0B) - 별의 따뜻함을 표현
- **스타일**: 미니멀하고 모던한 디자인
- **다크모드**: 자동 시스템 테마 감지 및 수동 전환 지원
- **타이포그래피**: 깔끔하고 읽기 쉬운 Geist 폰트 패밀리
- **인터랙션**: 부드러운 애니메이션과 마이크로 인터랙션

## 기술 스택

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with Custom Design System
- **Font**: Geist Sans & Geist Mono
- **Icons**: Custom Star Icons & Modern UI Elements
- **Dark Mode**: next-themes with System Preference Detection

## Getting Started

개발 서버를 실행하세요:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

`app/page.tsx`를 수정하여 페이지를 편집할 수 있습니다. 파일을 편집하면 페이지가 자동으로 업데이트됩니다.

## 프로젝트 구조

```
reviewers/
├── app/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── ui/             # 기본 UI 컴포넌트 (Button, Card 등)
│   │   ├── StarRating.tsx  # 별점 컴포넌트
│   │   ├── ReviewCard.tsx  # 리뷰 카드 컴포넌트
│   │   ├── Header.tsx      # 헤더 네비게이션
│   │   └── ThemeToggle.tsx # 다크모드 토글
│   ├── hooks/              # 커스텀 훅
│   │   └── useReviewers.ts # 리뷰 관련 상태 관리
│   ├── lib/                # 유틸리티 함수
│   ├── types/              # TypeScript 타입 정의
│   ├── globals.css         # 글로벌 스타일 (Tailwind + 커스텀)
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 메인 페이지
├── public/                 # 정적 파일
│   └── icons/              # 커스텀 아이콘
├── tailwind.config.js      # Tailwind 설정 (커스텀 색상 포함)
└── package.json
```

## 컬러 팔레트

### Light Mode
- **Primary**: Golden Yellow (#FFD700, #F59E0B, #FBBF24)
- **Background**: Clean White (#FFFFFF, #F9FAFB)
- **Text**: Charcoal (#111827, #374151)
- **Accent**: Soft Gray (#E5E7EB, #D1D5DB)

### Dark Mode
- **Primary**: Bright Gold (#FFD700, #FCD34D)
- **Background**: Deep Dark (#0F172A, #1E293B)
- **Text**: Light Gray (#F8FAFC, #E2E8F0)
- **Accent**: Dark Gray (#334155, #475569)

## 컴포넌트 가이드

### StarRating 컴포넌트
```tsx
<StarRating 
  rating={4} 
  onRatingChange={setRating} 
  size="lg" 
  interactive={true} 
/>
```

### ReviewCard 컴포넌트
```tsx
<ReviewCard 
  review={reviewData} 
  variant="default" 
  showActions={true} 
/>
```

## Learn More

Next.js에 대해 더 알아보려면 다음 리소스를 확인하세요:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API에 대해 알아보세요.
- [Learn Next.js](https://nextjs.org/learn) - 대화형 Next.js 튜토리얼입니다.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - 유틸리티 우선 CSS 프레임워크

[Next.js GitHub repository](https://github.com/vercel/next.js)를 확인해보세요 - 피드백과 기여를 환영합니다!

## Deploy on Vercel

Next.js 앱을 배포하는 가장 쉬운 방법은 Next.js 제작자들이 만든 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

자세한 내용은 [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)을 확인하세요.

## 라이센스

MIT License - 자유롭게 사용하세요!
