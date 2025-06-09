'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { PenSquare, Search, User, LogOut, Star } from 'lucide-react'
import { useState } from 'react'
import { LoginButton } from '@/components/auth/login'

export function Header() {
  const { user, signOut } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Star className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          <span className="text-xl font-bold">reviewers</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="리뷰 검색..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Button asChild>
                <Link href="/write">
                  <PenSquare className="h-4 w-4 mr-2" />
                  리뷰 작성
                </Link>
              </Button>
              
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary"
                >
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.username || 'User'}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user.username || 'User'}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1">
                    <Link
                      href={`/profile/${user.username}`}
                      className="block px-4 py-2 text-sm hover:bg-secondary"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      내 프로필
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm hover:bg-secondary"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      설정
                    </Link>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={() => {
                        signOut()
                        setIsProfileOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="리뷰 검색..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-gray-500"
          />
        </div>
      </div>
    </header>
  )
}
