# reviewers

세상의 모든 것을 리뷰할 수 있는 커뮤니티 플랫폼입니다.

## 프로젝트 개요

상품, 음식점부터 일상의 사소한 것들까지 자유롭게 리뷰하고, 다른 사람들과 의견을 나눌 수 있는 플랫폼입니다.

## 기술 스택

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Font**: Pretendard Variable
- **Icons**: Lucide React
- **State Management**: Zustand, React Query

## 주요 기능

### 🔍 리뷰하기
- 리뷰 작성 폼 (제목, 내용, 대상, 태그, 별점)
- 이미지 업로드 지원
- 익명/실명 선택 가능
- 마크다운 지원

### 📝 리뷰받기
- 리뷰 대상 등록
- 리뷰 요청 목록
- 피드백 시스템

### 🌟 커뮤니티
- 리뷰 피드 (최신순, 인기순, 평점순)
- 좋아요, 댓글 시스템
- 사용자 프로필

## 시작하기

### 환경 설정

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
cp .env.local.example .env.local
```

`.env.local` 파일에 Supabase 설정을 추가하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. 개발 서버 실행
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### Supabase 데이터베이스 설정

프로젝트에서 사용하는 데이터베이스 스키마:

```sql
-- 사용자 테이블 (Supabase Auth 확장)
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 리뷰 테이블
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  tags TEXT[],
  category TEXT,
  image_urls TEXT[],
  is_anonymous BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 리뷰 요청 테이블
CREATE TABLE review_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 좋아요 테이블
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, review_id)
);

-- 댓글 테이블
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 프로젝트 구조

```
/app                # Next.js App Router 페이지
  /login           # 로그인 페이지
  /signup          # 회원가입 페이지
  /write           # 리뷰 작성 페이지
  /review/[id]     # 리뷰 상세 페이지
  /requests        # 리뷰 요청 목록
  /profile/[username] # 사용자 프로필
/components         # 재사용 가능한 컴포넌트
  /ui              # 기본 UI 컴포넌트
  /layout          # 레이아웃 컴포넌트
  /review          # 리뷰 관련 컴포넌트
/contexts          # React Context
/lib               # 유틸리티 및 설정
  /supabase        # Supabase 클라이언트 설정
/types             # TypeScript 타입 정의
```

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
