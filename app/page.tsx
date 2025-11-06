import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold text-blue-600">
                  의왕 VS 정책 랩
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-700">
                {session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            VS 프롬프트 생성기
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Verbal Sampling 기법을 활용하여 창의적인 정책 아이디어를 생성합니다
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="issue"
                className="block text-sm font-medium text-gray-700"
              >
                정책 현안
              </label>
              <textarea
                id="issue"
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="해결하고자 하는 정책 현안을 입력하세요..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                창의성 레벨
              </label>
              <div className="mt-2 flex gap-4">
                <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                  낮음 (0.3)
                </button>
                <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                  중간 (0.1)
                </button>
                <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                  높음 (0.05)
                </button>
              </div>
            </div>

            <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
              아이디어 생성하기
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">
            생성된 아이디어
          </h3>
          <p className="mt-4 text-sm text-gray-500">
            위 폼을 작성하고 '아이디어 생성하기' 버튼을 클릭하세요.
          </p>
        </div>
      </main>
    </div>
  )
}
