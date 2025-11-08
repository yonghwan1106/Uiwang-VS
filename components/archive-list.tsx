"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

interface IdeaRecord {
  id: string
  date: string
  담당자: string
  원본현안: string
  VS아이디어: string
  확률: string
  키워드: string
}

export default function ArchiveList() {
  const [ideas, setIdeas] = useState<IdeaRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIdea, setSelectedIdea] = useState<IdeaRecord | null>(null)

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/archive")
      if (response.ok) {
        const data = await response.json()
        setIdeas(data.data || [])
      }
    } catch (error) {
      console.error("Error fetching ideas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-20">
        <div className="text-center">
          <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">아이디어를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (ideas.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 sm:p-12 shadow-lg text-center">
        <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">
          저장된 아이디어가 없습니다
        </p>
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          생성기에서 아이디어를 생성하고 저장해보세요
        </p>
        <a
          href="/"
          className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          생성기로 이동
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            onClick={() => setSelectedIdea(idea)}
            className="cursor-pointer rounded-xl bg-white p-4 sm:p-6 shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:border-blue-300 hover:scale-[1.02]"
          >
            <div className="mb-2 sm:mb-3 flex items-start justify-between gap-2">
              <span className="rounded-full bg-blue-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-blue-700">
                {idea.id}
              </span>
              <span className="rounded-full bg-purple-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold text-purple-700">
                확률: {idea.확률}
              </span>
            </div>

            <h3 className="mb-2 text-base sm:text-lg font-bold text-gray-900 line-clamp-2">
              {idea.원본현안}
            </h3>

            <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 line-clamp-3">
              {idea.VS아이디어.substring(0, 150)}...
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="truncate">{idea.담당자}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {idea.date}
              </div>
            </div>

            {idea.키워드 && (
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
                {idea.키워드.split(',').map((keyword, idx) => (
                  <span key={idx} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIdea && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedIdea(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-4 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 sm:mb-6 flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-blue-700">
                    {selectedIdea.id}
                  </span>
                  <span className="rounded-full bg-purple-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-purple-700">
                    확률: {selectedIdea.확률}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                  원본 현안
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  {selectedIdea.원본현안}
                </p>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="ml-2 sm:ml-4 rounded-lg p-1.5 sm:p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex-shrink-0"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="mb-2 sm:mb-3 text-base sm:text-xl font-bold text-gray-900">
                생성된 VS 아이디어
              </h3>
              <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 border border-green-200">
                <ReactMarkdown
                  components={{
                    h1: (props) => <h1 className="text-lg sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 text-gray-900 border-b-2 border-green-200 pb-2" {...props} />,
                    h2: (props) => <h2 className="text-base sm:text-xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 text-gray-900" {...props} />,
                    h3: (props) => <h3 className="text-sm sm:text-lg font-semibold mt-3 sm:mt-4 mb-2 text-gray-800" {...props} />,
                    p: (props) => <p className="mb-2 sm:mb-3 text-sm sm:text-base text-gray-700 leading-relaxed" {...props} />,
                    ul: (props) => <ul className="list-disc pl-5 sm:pl-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-5 sm:pl-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2" {...props} />,
                    li: (props) => <li className="text-sm sm:text-base text-gray-700 leading-relaxed" {...props} />,
                    strong: (props) => <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded" {...props} />,
                  }}
                >
                  {selectedIdea.VS아이디어}
                </ReactMarkdown>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="rounded-lg bg-blue-50 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-semibold text-gray-700">담당자</span>
                </div>
                <p className="text-gray-900">{selectedIdea.담당자}</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-gray-700">생성일시</span>
                </div>
                <p className="text-gray-900 text-xs sm:text-sm">{selectedIdea.date}</p>
              </div>
            </div>

            {selectedIdea.키워드 && (
              <div className="mt-3 sm:mt-4 rounded-lg bg-gray-50 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">키워드</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedIdea.키워드.split(',').map((keyword, idx) => (
                    <span key={idx} className="rounded-full bg-gray-200 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-gray-700">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
