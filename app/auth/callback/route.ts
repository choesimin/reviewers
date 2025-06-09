import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // 사용자 프로필이 없으면 생성
      const { data: existingProfile } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!existingProfile) {
        const username = data.user.user_metadata?.full_name || 
                        data.user.user_metadata?.name || 
                        data.user.email?.split('@')[0] || 
                        `user_${data.user.id.slice(0, 8)}`

        await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email!,
          username,
          avatar_url: data.user.user_metadata?.avatar_url || null,
        })
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // 오류가 발생한 경우 로그인 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
