import { auth } from "@/auth"
import { redirect } from "next/navigation"
import VSGenerator from "@/components/vs-generator"

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

        <VSGenerator />
      </main>
    </div>
  )
}
