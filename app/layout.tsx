'use client';

import { useState, createContext, useContext, useEffect } from "react";
import "./globals.css";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // 메타데이터 설정
  useEffect(() => {
    document.title = "Reviewers - 리뷰 커뮤니티";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '자유롭게 리뷰하고, 리뷰받고 싶은 것을 등록하는 커뮤니티');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = '자유롭게 리뷰하고, 리뷰받고 싶은 것을 등록하는 커뮤니티';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <html lang="ko" className={isDarkMode ? "dark" : ""}>
      <body className={`font-sans antialiased ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
