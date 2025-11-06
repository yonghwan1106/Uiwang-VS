import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPromptTemplates } from "@/lib/google-sheets"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const templates = await getPromptTemplates()
    return NextResponse.json({ success: true, data: templates })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
