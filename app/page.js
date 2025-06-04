'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Reviewers.kr</h1>
        <p className="text-lg mb-8">세상의 모든 것을 리뷰하는 공간</p>
        <Link href="/write" className="bg-blue-500 text-white px-4 py-2 rounded">
          리뷰 작성하기
        </Link>
      </div>
    </div>
  )
}
