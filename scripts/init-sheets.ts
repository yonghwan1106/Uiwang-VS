import { google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function initializeSheets() {
  try {
    console.log("🚀 Google Sheets 초기화를 시작합니다...\n");

    // Private key 처리
    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || "";
    privateKey = privateKey.replace(/^"/, '').replace(/"$/, '');
    privateKey = privateKey.replace(/\n/g, "\n");

    if (!privateKey || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("필수 환경 변수가 설정되지 않았습니다.");
    }

    // 인증 설정
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log(`📊 Sheet ID: ${spreadsheetId}\n`);

    // 기존 시트 확인
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];
    
    console.log("📄 기존 시트:", existingSheets.join(", "));
    console.log("");

    // 필요한 시트 생성
    const requiredSheets = ["아이디어_DB", "프롬프트_템플릿", "사용자_로그"];
    const sheetsToCreate = requiredSheets.filter(s => !existingSheets.includes(s));

    if (sheetsToCreate.length > 0) {
      console.log("📝 새 시트를 생성합니다:", sheetsToCreate.join(", "));
      
      const requests = sheetsToCreate.map(sheetName => ({
        addSheet: {
          properties: {
            title: sheetName,
          },
        },
      }));

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      });
      
      console.log("✅ 시트 생성 완료\n");
    } else {
      console.log("✅ 모든 시트가 이미 존재합니다\n");
    }

    // 1. 아이디어_DB 시트 헤더 설정
    console.log("📝 '아이디어_DB' 시트 헤더를 설정합니다...");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "아이디어_DB!A1:G1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["ID", "날짜", "담당자", "원본현안", "VS아이디어", "확률", "키워드"]],
      },
    });
    console.log("✅ '아이디어_DB' 시트 헤더 설정 완료\n");

    // 2. 프롬프트_템플릿 시트 헤더 설정
    console.log("📝 '프롬프트_템플릿' 시트 헤더를 설정합니다...");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "프롬프트_템플릿!A1:B1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["name", "template"]],
      },
    });
    console.log("✅ '프롬프트_템플릿' 시트 헤더 설정 완료\n");

    // 3. 프롬프트 템플릿 샘플 데이터 추가
    console.log("📝 프롬프트 템플릿 샘플 데이터를 추가합니다...");
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "프롬프트_템플릿!A2:B",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            "시민제안 개선",
            "다음 시민 제안을 검토하고, 기존 의왕시 정책과 중복되지 않도록 창의적으로 발전시켜주세요: {issue}",
          ],
          [
            "타 지자체 융합",
            "다음 현안에 대해 타 지자체 우수 사례를 참고하되, 의왕시만의 특색(ITS 인프라, 철도박물관 등)을 살린 창의적 해결책을 제시해주세요: {issue}",
          ],
          [
            "신규사업 발굴",
            "의왕시의 강점을 활용한 새로운 사업 아이디어를 제안해주세요. 예산 효율성과 시민 체감도를 모두 고려해주세요: {issue}",
          ],
          [
            "불법 주정차 해결",
            "의왕시의 고질적 문제인 불법 주정차를 해결하기 위한 창의적이면서도 실현 가능한 방안을 제시해주세요: {issue}",
          ],
        ],
      },
    });
    console.log("✅ 프롬프트 템플릿 샘플 데이터 추가 완료\n");

    // 4. 사용자_로그 시트 헤더 설정
    console.log("📝 '사용자_로그' 시트 헤더를 설정합니다...");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "사용자_로그!A1:D1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["timestamp", "user", "action", "details"]],
      },
    });
    console.log("✅ '사용자_로그' 시트 헤더 설정 완료\n");

    console.log("🎉 모든 시트 초기화가 완료되었습니다!");
    console.log("\n📋 설정된 시트:");
    console.log("  1. 아이디어_DB - 헤더 7개 컬럼");
    console.log("  2. 프롬프트_템플릿 - 헤더 2개 컬럼 + 샘플 데이터 4개");
    console.log("  3. 사용자_로그 - 헤더 4개 컬럼");
    console.log(
      `\n🔗 시트 확인: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    );
  } catch (error: any) {
    console.error("❌ 오류 발생:", error.message);
    if (error.response) {
      console.error("상세 오류:", error.response.data);
    }
    process.exit(1);
  }
}

initializeSheets();
