import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testAuth() {
  console.log("🔍 환경 변수 확인:\n");
  console.log("CLIENT_EMAIL:", process.env.GOOGLE_SHEETS_CLIENT_EMAIL);
  console.log("SHEET_ID:", process.env.GOOGLE_SHEET_ID);
  console.log("PRIVATE_KEY exists:", !!process.env.GOOGLE_SHEETS_PRIVATE_KEY);
  
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    ?.replace(/^"/, '')
    ?.replace(/"$/, '')
    ?.replace(/\n/g, "\n");
  
  console.log("\n🔑 Private key 첫 50자:", privateKey?.substring(0, 50));
  
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      privateKey,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    
    console.log("\n✅ JWT 객체 생성 성공");
    
    // 토큰 가져오기 시도
    const token = await auth.getAccessToken();
    console.log("✅ 액세스 토큰 획득 성공");
    
    // Sheets API 호출 테스트
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    console.log("\n✅ Google Sheets API 연결 성공!");
    console.log("📊 스프레드시트 제목:", response.data.properties?.title);
    console.log("📄 시트 목록:");
    response.data.sheets?.forEach((sheet) => {
      console.log(`   - ${sheet.properties?.title}`);
    });
    
  } catch (error: any) {
    console.error("\n❌ 오류:", error.message);
    if (error.response) {
      console.error("상세:", error.response.data);
    }
  }
}

testAuth();
