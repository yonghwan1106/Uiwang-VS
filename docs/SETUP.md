# 의왕 VS 정책 랩 설정 가이드

## 1. 환경 변수 설정

### 1.1 NEXTAUTH_SECRET 생성
```bash
openssl rand -base64 32
```

### 1.2 Google OAuth 설정
1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "OAuth 동의 화면" 설정
4. "사용자 인증 정보" > "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
5. 애플리케이션 유형: 웹 애플리케이션
6. 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google`
7. 클라이언트 ID와 클라이언트 보안 비밀번호를 .env.local에 추가

### 1.3 Google Sheets API 설정
1. Google Cloud Console에서 "API 및 서비스" > "라이브러리"
2. "Google Sheets API" 검색 및 활성화
3. "사용자 인증 정보" > "서비스 계정" 생성
4. 서비스 계정에 "Editor" 역할 부여
5. 키 생성 (JSON 형식)
6. JSON 파일에서 `client_email`과 `private_key` 추출
7. .env.local에 추가

### 1.4 Google Sheet 생성
1. 새 Google Sheet 생성
2. 다음 3개의 시트(탭) 생성:
   - 아이디어_DB
   - 프롬프트_템플릿
   - 사용자_로그

3. 아이디어_DB 시트 헤더 (첫 번째 행):
   ```
   ID | 날짜 | 담당자 | 원본현안 | VS아이디어 | 확률 | 키워드
   ```

4. 프롬프트_템플릿 시트 헤더:
   ```
   name | template
   ```

5. 서비스 계정 이메일로 시트 공유 (편집자 권한)
6. 시트 ID를 .env.local의 GOOGLE_SHEET_ID에 추가
   - URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   
## 2. 개발 서버 실행
```bash
npm run dev
```

## 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 4. Vercel 배포
```bash
vercel
```
