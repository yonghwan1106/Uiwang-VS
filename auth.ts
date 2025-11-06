import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      // 의왕시 이메일 도메인 검증 (@uiwang.go.kr)
      if (profile?.email) {
        const allowedDomains = ["uiwang.go.kr", "gmail.com"] // 개발용으로 gmail.com 추가
        const emailDomain = profile.email.split("@")[1]
        return allowedDomains.includes(emailDomain)
      }
      return false
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id
      }
      if (profile) {
        token.email = profile.email
      }
      return token
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
})
