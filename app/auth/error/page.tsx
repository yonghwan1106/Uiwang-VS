"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "접근이 거부되었습니다. 의왕시 계정(@uiwang.go.kr)으로만 로그인할 수 있습니다."
      case "Configuration":
        return "서버 설정 오류가 발생했습니다. 관리자에게 문의하세요."
      case "Verification":
        return "인증 확인에 실패했습니다. 다시 시도해주세요."
      default:
        return "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">인증 오류</h1>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            {getErrorMessage(error)}
          </p>

          <Link
            href="/auth/signin"
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            다시 로그인하기
          </Link>
        </div>
      </div>
    </div>
  )
}
