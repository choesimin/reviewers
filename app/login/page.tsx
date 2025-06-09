'use client'

import { GoogleLoginButton, KakaoLoginButton } from '@/components/auth/social-login'

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">로그인</h2>
          <p className="mt-2 text-muted-foreground">
            SNS 계정으로 간편하게 로그인하세요
          </p>
        </div>
        
        <div className="space-y-4 mt-8">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            처음 로그인하시면 자동으로 계정이 생성됩니다
          </p>
        </div>
      </div>
    </div>
  )
}
