export default function OAuthSetupGuide() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">SNS 로그인 설정 가이드</h1>
      
      <div className="space-y-8">
        {/* Google OAuth */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 mr-3 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            Google OAuth 설정
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Google Cloud Console 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>에 접속</li>
                <li>새 프로젝트 생성 또는 기존 프로젝트 선택</li>
                <li>"APIs & Services" → "Credentials" 메뉴로 이동</li>
                <li>"Create Credentials" → "OAuth 2.0 Client IDs" 선택</li>
                <li>Application type: "Web application" 선택</li>
                <li>Authorized redirect URIs에 추가: <code className="bg-gray-100 px-2 py-1 rounded">https://npitkcozfbalelfxwqdj.supabase.co/auth/v1/callback</code></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Supabase 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Supabase 대시보드 → Authentication → Providers</li>
                <li>Google 활성화</li>
                <li>Google Cloud Console에서 복사한 Client ID와 Client Secret 입력</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Kakao OAuth */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 mr-3 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">K</span>
            </div>
            카카오 OAuth 설정
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. 카카오 개발자 센터 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><a href="https://developers.kakao.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">카카오 개발자 센터</a>에 접속</li>
                <li>애플리케이션 추가하기</li>
                <li>앱 설정 → 플랫폼 → Web 플랫폼 등록</li>
                <li>사이트 도메인: <code className="bg-gray-100 px-2 py-1 rounded">https://npitkcozfbalelfxwqdj.supabase.co</code></li>
                <li>제품 설정 → 카카오 로그인 → Redirect URI 설정: <code className="bg-gray-100 px-2 py-1 rounded">https://npitkcozfbalelfxwqdj.supabase.co/auth/v1/callback</code></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Supabase 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Supabase 대시보드 → Authentication → Providers</li>
                <li>Kakao 활성화</li>
                <li>카카오에서 발급받은 REST API 키를 Client ID로 입력</li>
                <li>Client Secret은 보안 → Client Secret 에서 발급</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Naver OAuth */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 mr-3 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            네이버 OAuth 설정
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. 네이버 개발자 센터 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><a href="https://developers.naver.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">네이버 개발자 센터</a>에 접속</li>
                <li>Application → 애플리케이션 등록</li>
                <li>애플리케이션 이름 및 사용 API 선택 (네이버 로그인)</li>
                <li>서비스 URL: <code className="bg-gray-100 px-2 py-1 rounded">https://npitkcozfbalelfxwqdj.supabase.co</code></li>
                <li>Callback URL: <code className="bg-gray-100 px-2 py-1 rounded">https://npitkcozfbalelfxwqdj.supabase.co/auth/v1/callback</code></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Supabase 설정</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Supabase 대시보드 → Authentication → Providers</li>
                <li>Naver 활성화 (Custom OAuth Provider로 설정 필요할 수 있음)</li>
                <li>네이버에서 발급받은 Client ID와 Client Secret 입력</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">중요 참고사항</h2>
          <ul className="space-y-2 text-sm text-blue-700">
            <li><strong>개발 환경:</strong> 로컬 개발 시에는 <code>http://localhost:3000</code>를 허용된 도메인으로 추가해야 합니다.</li>
            <li><strong>배포 환경:</strong> 프로덕션 도메인을 각 OAuth 제공자에 등록해야 합니다.</li>
            <li><strong>콜백 URL:</strong> 모든 제공자에서 Supabase의 콜백 URL을 정확히 설정해야 합니다.</li>
            <li><strong>스코프 설정:</strong> 각 제공자에서 필요한 사용자 정보 스코프를 설정하세요 (이메일, 프로필 등).</li>
          </ul>
        </div>

        {/* Test Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">테스트 방법</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
            <li>OAuth 제공자 설정 완료</li>
            <li>Supabase에서 각 제공자 활성화 및 설정</li>
            <li><a href="/login" className="text-blue-600 hover:underline">로그인 페이지</a>에서 SNS 로그인 버튼 테스트</li>
            <li>로그인 성공 시 사용자 프로필이 자동으로 생성되는지 확인</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
