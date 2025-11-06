"use client"

import { useState } from "react"

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

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="issue"
                className="block text-sm font-medium text-gray-700"
              >
                정책 현안
              </label>
              <span className="text-xs text-gray-500">
                샘플 데이터를 클릭하여 테스트해보세요
              </span>
            </div>

            <div className="mb-3 flex gap-2">
              {SAMPLE_ISSUES.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleClick(sample.content)}
                  className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                >
                  {sample.title}
                </button>
              ))}
            </div>

            <textarea
              id="issue"
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="해결하고자 하는 정책 현안을 입력하세요..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              창의성 레벨
              <span className="ml-2 text-blue-600 font-semibold">
                {creativityLevel.toFixed(2)}
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              값이 낮을수록 더 창의적이지만 실현 가능성이 낮은 아이디어를 생성합니다
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-xs text-gray-600">
                <span>매우 창의적 (0.01)</span>
                <span>균형적 (0.1)</span>
                <span>안정적 (0.5)</span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-xs">
                <button
                  onClick={() => setCreativityLevel(0.01)}
                  className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
                >
                  0.01
                </button>
                <button
                  onClick={() => setCreativityLevel(0.05)}
                  className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
                >
                  0.05
                </button>
                <button
                  onClick={() => setCreativityLevel(0.1)}
                  className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
                >
                  0.1
                </button>
                <button
                  onClick={() => setCreativityLevel(0.2)}
                  className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
                >
                  0.2
                </button>
                <button
                  onClick={() => setCreativityLevel(0.3)}
                  className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-50"
                >
                  0.3
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isGenerating ? "생성 중..." : "아이디어 생성하기"}
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-semibold text-gray-900">
          생성된 아이디어
        </h3>
        {results ? (
          <div className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
            {results}
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            위 폼을 작성하고 '아이디어 생성하기' 버튼을 클릭하세요.
          </p>
        )}
      </div>
    </div>
  )
}
