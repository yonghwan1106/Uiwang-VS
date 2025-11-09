import { auth } from "@/auth"
import { redirect } from "next/navigation"
import ArchiveList from "@/components/archive-list"

export default async function ArchivePage() {
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
                  className="inline-flex items-center border-b-2 border-blue-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-blue-600"
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
            <div className="rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-3 sm:p-4 shadow-2xl animate-pulse">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            아이디어 아카이브
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            저장된 모든 VS 아이디어를 확인하고 관리할 수 있습니다
          </p>
        </div>

        <ArchiveList />
      </main>
    </div>
  )
}
