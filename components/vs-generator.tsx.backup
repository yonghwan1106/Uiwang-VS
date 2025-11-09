"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"

const SAMPLE_ISSUES = [
  {
    title: "불법 주정차 해결",
    content: "의왕시의 고질적 문제인 불법 주정차를 효과적으로 해결할 수 있는 창의적이고 실현 가능한 방안을 제시해주세요. 기존의 단속 중심 방식이 아닌 새로운 접근이 필요합니다."
  },
  {
    title: "청년 일자리 창출",
    content: "의왕시 청년들을 위한 양질의 일자리를 창출하고, 지역 내 정착을 유도할 수 있는 혁신적인 정책을 제안해주세요. ITS 인프라 등 의왕시의 강점을 활용한 방안을 포함해주세요."
  },
  {
    title: "고령자 복지 서비스",
    content: "증가하는 고령 인구를 위한 차별화된 복지 서비스를 제안해주세요. 기존 서비스와 중복되지 않으면서도 실질적인 도움이 되는 창의적인 아이디어가 필요합니다."
  }
]

export default function VSGenerator() {
  const [issue, setIssue] = useState("")
  const [creativityLevel, setCreativityLevel] = useState(0.1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [results, setResults] = useState<string>("")

  const handleSampleClick = (sampleContent: string) => {
    setIssue(sampleContent)
  }

  const handleGenerate = async () => {
    if (!issue.trim()) {
      alert("정책 현안을 입력해주세요.")
      return
    }

    setIsGenerating(true)
    setResults("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue,
          creativityLevel,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate ideas")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          setResults((prev) => prev + chunk)
        }
      }
    } catch (error) {
      console.error("Error generating ideas:", error)
      alert("아이디어 생성 중 오류가 발생했습니다.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveIdea = async () => {
    if (!results.trim()) {
      alert("저장할 아이디어가 없습니다.")
      return
    }

    if (!issue.trim()) {
      alert("원본 현안 정보가 없습니다.")
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/archive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          원본현안: issue,
          VS아이디어: results,
          확률: creativityLevel.toString(),
          키워드: "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save idea")
      }

      const data = await response.json()
      if (data.success) {
        alert("아이디어가 성공적으로 저장되었습니다!")
      }
    } catch (error) {
      console.error("Error saving idea:", error)
      alert("아이디어 저장 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-4 sm:space-y-8">
      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-8 shadow-lg border border-blue-100">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label
                htmlFor="issue"
                className="flex items-center text-sm sm:text-base font-semibold text-gray-800"
              >
                <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                정책 현안
              </label>
              <span className="text-xs text-blue-600 font-medium">
                💡 샘플 데이터를 클릭하여 테스트해보세요
              </span>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
              {SAMPLE_ISSUES.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleClick(sample.content)}
                  className="flex-1 rounded-lg border-2 border-blue-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-95"
                >
                  {sample.title}
                </button>
              ))}
            </div>

            <textarea
              id="issue"
              rows={5}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="block w-full rounded-lg border-2 border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="해결하고자 하는 정책 현안을 자세히 입력하세요..."
            />
          </div>

          <div>
            <label className="flex items-center text-sm sm:text-base font-semibold text-gray-800">
              <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              창의성 레벨
              <span className="ml-2 sm:ml-3 rounded-full bg-purple-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-purple-700 font-bold">
                {creativityLevel.toFixed(2)}
              </span>
            </label>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              💡 값이 낮을수록 더 창의적이지만 실현 가능성이 낮은 아이디어를 생성합니다
            </p>

            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(parseFloat(e.target.value))}
                className="w-full h-2 sm:h-3 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer accent-purple-600 shadow-sm"
              />

              <div className="hidden sm:flex justify-between text-xs font-medium text-gray-600">
                <span className="text-purple-600">🚀 매우 창의적 (0.01)</span>
                <span className="text-blue-600">⚖️ 균형적 (0.1)</span>
                <span className="text-green-600">🎯 안정적 (0.5)</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCreativityLevel(0.01)}
                  className={`rounded-lg border-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${
                    creativityLevel === 0.01
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  0.01
                </button>
                <button
                  onClick={() => setCreativityLevel(0.05)}
                  className={`rounded-lg border-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${
                    creativityLevel === 0.05
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  0.05
                </button>
                <button
                  onClick={() => setCreativityLevel(0.1)}
                  className={`rounded-lg border-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${
                    creativityLevel === 0.1
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  0.1
                </button>
                <button
                  onClick={() => setCreativityLevel(0.2)}
                  className={`rounded-lg border-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${
                    creativityLevel === 0.2
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  0.2
                </button>
                <button
                  onClick={() => setCreativityLevel(0.3)}
                  className={`rounded-lg border-2 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all hover:shadow-md active:scale-95 ${
                    creativityLevel === 0.3
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                  }`}
                >
                  0.3
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center">
              {isGenerating ? (
                <>
                  <svg className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  아이디어 생성 중...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  아이디어 생성하기
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-8 shadow-lg border border-green-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="flex items-center text-lg sm:text-xl font-bold text-gray-900">
            <svg className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            생성된 아이디어
          </h3>
          {results && (
            <button
              onClick={handleSaveIdea}
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg active:scale-95 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
            >
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {isSaving ? "저장 중..." : "아이디어 저장"}
            </button>
          )}
        </div>
        {results ? (
          <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm border border-green-200">
            <ReactMarkdown
              components={{
                h1: (props) => <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 text-gray-900 border-b-2 border-green-200 pb-2" {...props} />,
                h2: (props) => <h2 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 text-gray-900" {...props} />,
                h3: (props) => <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2 text-gray-800" {...props} />,
                p: (props) => <p className="mb-3 text-sm sm:text-base text-gray-700 leading-relaxed" {...props} />,
                ul: (props) => <ul className="list-disc pl-5 sm:pl-6 mb-4 space-y-1 sm:space-y-2" {...props} />,
                ol: (props) => <ol className="list-decimal pl-5 sm:pl-6 mb-4 space-y-1 sm:space-y-2" {...props} />,
                li: (props) => <li className="text-sm sm:text-base text-gray-700 leading-relaxed" {...props} />,
                strong: (props) => <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded" {...props} />,
              }}
            >
              {results}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <svg className="mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-base sm:text-lg font-medium text-gray-500 mb-2">
              아직 생성된 아이디어가 없습니다
            </p>
            <p className="text-xs sm:text-sm text-gray-400 px-4">
              위에서 정책 현안을 입력하고 "아이디어 생성하기" 버튼을 눌러주세요
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
