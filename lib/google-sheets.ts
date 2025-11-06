import { google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

export async function getGoogleSheetsClient() {
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || ""
  privateKey = privateKey.replace(/^"/, '').replace(/"$/, '')
  privateKey = privateKey.replace(/\n/g, "\n")

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: "v4", auth })
  return sheets
}

export interface IdeaRecord {
  id: string
  date: string
  담당자: string
  원본현안: string
  VS아이디어: string
  확률: string
  키워드: string
}

export async function appendIdeaToSheet(idea: Omit<IdeaRecord, "id">) {
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  const id = "IDEA-" + Date.now().toString()

  const values = [
    [
      id,
      idea.date,
      idea.담당자,
      idea.원본현안,
      idea.VS아이디어,
      idea.확률,
      idea.키워드,
    ],
  ]

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "아이디어_DB!A:G",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    return { success: true, data: response.data }
  } catch (error) {
    console.error("Error appending to Google Sheets:", error)
    throw error
  }
}

export async function getIdeasFromSheet() {
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "아이디어_DB!A:G",
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return []
    }

    const [headers, ...dataRows] = rows

    return dataRows.map((row) => ({
      id: row[0] || "",
      date: row[1] || "",
      담당자: row[2] || "",
      원본현안: row[3] || "",
      VS아이디어: row[4] || "",
      확률: row[5] || "",
      키워드: row[6] || "",
    }))
  } catch (error) {
    console.error("Error reading from Google Sheets:", error)
    throw error
  }
}

export async function getPromptTemplates() {
  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "프롬프트_템플릿!A:B",
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return []
    }

    const [headers, ...dataRows] = rows

    return dataRows.map((row) => ({
      name: row[0] || "",
      template: row[1] || "",
    }))
  } catch (error) {
    console.error("Error reading templates from Google Sheets:", error)
    throw error
  }
}
