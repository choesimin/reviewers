import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/contexts/auth-context'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: "reviewers - 세상의 모든 것을 리뷰하는 커뮤니티",
  description: "상품, 음식점부터 일상의 사소한 것들까지 자유롭게 리뷰할 수 있는 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link 
          rel="stylesheet" 
          as="style" 
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" 
        />
      </head>
      <body className="font-pretendard antialiased overflow-x-hidden">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
