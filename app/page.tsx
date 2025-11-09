import { auth } from "@/auth"
import { redirect } from "next/navigation"
import VSGenerator from "@/components/vs-generator"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
                  className="inline-flex items-center border-b-2 border-blue-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-blue-600"
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
                  className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600"
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
        <div className="mb-6 sm:mb-10 text-center">
          <div className="mb-3 sm:mb-4 flex items-center justify-center">
            <div className="rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-3 sm:p-4 shadow-2xl animate-pulse">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">
            VS 프롬프트 생성기
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            <span className="font-semibold text-blue-600">Verbal Sampling</span> 기법을 활용하여
            창의적이고 실현 가능한 정책 아이디어를 생성합니다
          </p>
          
          <div className="mt-4 sm:mt-6 mx-auto max-w-3xl px-4">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-1">VS 기법이란?</h3>
                  <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                    Verbal Sampling(VS)은 다양한 언어적 단서를 샘플링하여 새로운 아이디어를 창출하는 기법입니다. 
                    주어진 키워드들을 조합하고 재구성하여 창의적이면서도 실현 가능한 정책 방안을 도출합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>AI 기반 생성</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>창의성 조절 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>아카이브 저장</span>
            </div>
          </div>
        </div>

        <VSGenerator />
      </main>
    </div>
  )
}
