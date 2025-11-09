import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AboutPage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center">
                <a href="/" className="flex items-center">
                  <svg className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    의왕 VS 정책 랩
                  </h1>
                </a>
              </div>
              <div className="ml-4 sm:ml-6 flex space-x-2 sm:space-x-4">
                <a
                  href="/"
                  className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  생성기
                </a>
                <a
                  href="/archive"
                  className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  아카이브
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center border-b-2 border-blue-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-blue-600"
                >
                  소개
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {session.user?.email}
                </span>
              </div>
              <div className="sm:hidden flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            프로젝트 소개
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            의왕 VS 정책 랩은 Verbal Sampling 기법을 활용한 AI 기반 정책 아이디어 생성 플랫폼입니다
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">프로젝트 목적</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              의왕시의 다양한 정책 과제에 대해 창의적이고 혁신적인 해결책을 도출하기 위한 도구입니다. 
              AI와 Verbal Sampling 기법을 결합하여 공무원들이 더 쉽고 빠르게 정책 아이디어를 발굴하고 
              발전시킬 수 있도록 지원합니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Verbal Sampling (VS) 기법</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Verbal Sampling은 다양한 언어적 요소를 샘플링하고 조합하여 새로운 아이디어를 창출하는 
              창의적 사고 기법입니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">주요 기능</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">AI 프롬프트 생성</h4>
                <p className="text-sm text-gray-600">
                  키워드와 옵션을 입력하면 VS 기법을 적용한 맞춤형 프롬프트를 자동 생성합니다
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">창의성 조절</h4>
                <p className="text-sm text-gray-600">
                  창의성 수준을 조절하여 보수적이거나 혁신적인 아이디어를 선택적으로 생성할 수 있습니다
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">아카이브 관리</h4>
                <p className="text-sm text-gray-600">
                  생성된 프롬프트를 저장하고 관리하여 나중에 다시 활용할 수 있습니다
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Google Sheets 연동</h4>
                <p className="text-sm text-gray-600">
                  생성된 데이터를 Google Sheets와 자동으로 동기화하여 협업을 용이하게 합니다
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>프롬프트 생성하기</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  )
}
