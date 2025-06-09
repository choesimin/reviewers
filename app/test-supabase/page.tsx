'use client'

import { useState } from 'react'
import { testConnection, getCurrentUser, testDatabaseTables, testRPCConnection } from '@/lib/supabase/utils'

export default function TestConnection() {
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [userResult, setUserResult] = useState<any>(null)
  const [tableResult, setTableResult] = useState<any>(null)
  const [rpcResult, setRPCResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTestConnection = async () => {
    setLoading(true)
    try {
      const result = await testConnection()
      setConnectionResult(result)
    } catch (error) {
      setConnectionResult({ success: false, error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleTestTables = async () => {
    setLoading(true)
    try {
      const result = await testDatabaseTables()
      setTableResult(result)
    } catch (error) {
      setTableResult({ success: false, error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleTestRPC = async () => {
    setLoading(true)
    try {
      const result = await testRPCConnection()
      setRPCResult(result)
    } catch (error) {
      setRPCResult({ success: false, error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleGetUser = async () => {
    setLoading(true)
    try {
      const result = await getCurrentUser()
      setUserResult(result)
    } catch (error) {
      setUserResult({ user: null, error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const ResultDisplay = ({ result, title }: { result: any, title: string }) => {
    if (!result) return null
    
    return (
      <div className={`p-4 rounded-lg ${
        result.success 
          ? 'bg-green-50 border border-green-200 text-green-800' 
          : 'bg-red-50 border border-red-200 text-red-800'
      }`}>
        <h3 className="font-semibold mb-2">
          {result.success ? '✅' : '❌'} {title}
        </h3>
        {result.error && (
          <p className="text-sm mb-2"><strong>오류:</strong> {result.error}</p>
        )}
        {result.message && (
          <p className="text-sm mb-2"><strong>메시지:</strong> {result.message}</p>
        )}
        {result.note && (
          <p className="text-sm mb-2 text-yellow-700"><strong>참고:</strong> {result.note}</p>
        )}
        {result.details && (
          <details className="text-sm mt-2">
            <summary className="cursor-pointer font-medium">상세 정보</summary>
            <pre className="bg-white p-2 rounded mt-2 overflow-auto text-xs">
              {JSON.stringify(result.details, null, 2)}
            </pre>
          </details>
        )}
        {(result.data || result.session || result.user) && (
          <details className="text-sm mt-2">
            <summary className="cursor-pointer font-medium">데이터</summary>
            <pre className="bg-white p-2 rounded mt-2 overflow-auto text-xs">
              {JSON.stringify(result.data || result.session || result.user, null, 2)}
            </pre>
          </details>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Supabase 연결 테스트</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Connection Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">기본 연결 테스트</h2>
          <button 
            onClick={handleTestConnection} 
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
          >
            {loading ? '테스트 중...' : '연결 테스트'}
          </button>
          <ResultDisplay result={connectionResult} title="기본 연결" />
        </div>

        {/* Database Tables Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">데이터베이스 테이블 테스트</h2>
          <button 
            onClick={handleTestTables} 
            disabled={loading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50 mb-4"
          >
            {loading ? '테스트 중...' : '테이블 접근 테스트'}
          </button>
          <ResultDisplay result={tableResult} title="테이블 접근" />
        </div>

        {/* User Auth Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">사용자 인증 테스트</h2>
          <button 
            onClick={handleGetUser} 
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 mb-4"
          >
            {loading ? '확인 중...' : '현재 사용자 확인'}
          </button>
          <ResultDisplay result={userResult} title="사용자 인증" />
        </div>

        {/* RPC Test */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">RPC 연결 테스트</h2>
          <button 
            onClick={handleTestRPC} 
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50 mb-4"
          >
            {loading ? '테스트 중...' : 'RPC 테스트'}
          </button>
          <ResultDisplay result={rpcResult} title="RPC 연결" />
        </div>
      </div>

      {/* Environment Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">현재 환경 정보</h2>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || '설정되지 않음'}</p>
          <p><strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨 ✅' : '설정되지 않음 ❌'}</p>
          <p><strong>브라우저 환경:</strong> {typeof window !== 'undefined' ? '클라이언트 사이드 ✅' : '서버 사이드'}</p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">문제 해결 가이드</h2>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>연결 실패 시:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Supabase 프로젝트가 활성화되어 있는지 확인</li>
            <li>.env.local 파일의 URL과 키가 정확한지 확인</li>
            <li>개발 서버를 재시작: <code className="bg-white px-1 rounded">npm run dev</code></li>
            <li>브라우저의 네트워크 탭에서 요청 오류 확인</li>
            <li>Supabase 대시보드에서 API 사용량 확인</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
