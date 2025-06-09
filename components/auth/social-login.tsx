'use client'

import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

interface SocialLoginButtonProps {
  provider: 'google' | 'kakao'
  children: React.ReactNode
  className?: string
}

export function SocialLoginButton({ provider, children, className = '' }: SocialLoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle, signInWithKakao } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle()
          break
        case 'kakao':
          await signInWithKakao()
          break
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`
        w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg
        text-sm font-medium text-gray-700 bg-white hover:bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  )
}

// 개별 SNS 로그인 버튼 컴포넌트들
export function GoogleLoginButton() {
  return (
    <SocialLoginButton provider="google" className="hover:bg-blue-50 border-blue-200">
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Google로 로그인
    </SocialLoginButton>
  )
}

export function KakaoLoginButton() {
  return (
    <SocialLoginButton provider="kakao" className="bg-yellow-400 hover:bg-yellow-500 border-yellow-400 text-black">
      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
      </svg>
      카카오로 로그인
    </SocialLoginButton>
  )
}
