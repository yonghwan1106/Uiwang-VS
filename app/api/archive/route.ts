import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { appendIdeaToSheet, getIdeasFromSheet } from "@/lib/google-sheets"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { 원본현안, VS아이디어, 확률, 키워드 } = body

    if (!원본현안 || !VS아이디어 || !확률) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const result = await appendIdeaToSheet({
      date: new Date().toLocaleString("ko-KR"),
      담당자: session.user.email || "Unknown",
      원본현안,
      VS아이디어,
      확률,
      키워드: 키워드 || "",
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error archiving idea:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ideas = await getIdeasFromSheet()
    return NextResponse.json({ success: true, data: ideas })
  } catch (error) {
    console.error("Error fetching ideas:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
