import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
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
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Google 계정으로 로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
