# 의왕 VS 정책 랩 (Uiwang VS Policy Lab)

## 프로젝트 개요
의왕시 정책혁신팀을 위한 Verbal Sampling 기반 아이디어 생성 플랫폼

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js v5 (Google OAuth)
- Anthropic Claude Sonnet 4.0
- Google Sheets API
- Vercel 배포

## 개발 진행 상황

### ✅ 완료
1. Next.js 14 프로젝트 초기화
2. 필수 패키지 설치
3. 환경 변수 설정
4. NextAuth.js v5 Google OAuth 설정
5. Google Sheets API 연동
6. Claude API 연동
7. API Routes 구현

### 🚧 진행 중
- VS 프롬프트 생성기 UI 구현
- 아이디어 아카이빙 기능
- 아카이브 조회 페이지

### 📋 남은 작업
- UI 컴포넌트 완성
- Naver Maps API 연동 (선택사항)
- 테스트 및 디버깅
- Vercel 배포

## 환경 변수 설정 필요

.env.local 파일에 다음 값들을 설정해야 합니다:

1. NEXTAUTH_SECRET - NextAuth 비밀키
2. GOOGLE_CLIENT_ID - Google OAuth 클라이언트 ID
3. GOOGLE_CLIENT_SECRET - Google OAuth 클라이언트 시크릿
4. GOOGLE_SHEETS_CLIENT_EMAIL - Google Service Account 이메일
5. GOOGLE_SHEETS_PRIVATE_KEY - Google Service Account 비밀키
6. GOOGLE_SHEET_ID - 사용할 Google Sheet ID

CLAUDE_API_KEY와 NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID는 이미 설정됨.

## Google Sheets 구조

다음 3개의 시트가 필요합니다:

1. **아이디어_DB**
   - 컬럼: ID, 날짜, 담당자, 원본현안, VS아이디어, 확률, 키워드

2. **프롬프트_템플릿**
   - 컬럼: name, template

3. **사용자_로그**
   - 사용자 활동 기록용

## 다음 단계
1. UI 컴포넌트 완성하기
2. 개발 서버 실행 테스트
3. Google OAuth 설정
4. Google Sheets 설정 및 연동 테스트
