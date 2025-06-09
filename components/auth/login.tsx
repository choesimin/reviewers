'use client'

import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function LoginButton() {
  const [loading, setLoading] = useState(false)
  const { signInWithKakao } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    try {
      await signInWithKakao()
    } catch (error) {
      console.error('로그인 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      size="sm"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : null}
      로그인
    </Button>
  )
}
