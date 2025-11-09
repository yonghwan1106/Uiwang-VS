import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">의왕 VS 정책 랩</h1>
          <p className="mt-2 text-sm text-gray-600">
            Uiwang Verbal Sampling Policy Lab
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            Google 계정으로 로그인해주세요
          </p>

          <form
            action={async () => {
              "use server"
              try {
                await signIn("google", {
                  redirectTo: searchParams.callbackUrl || "/",
                })
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/auth/error?error=${error.type}`)
                }
                throw error
              }
            }}
          >
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 shadow-xl font-medium text-white transition hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Google 계정으로 로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
