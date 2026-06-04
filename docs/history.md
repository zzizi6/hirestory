# 프로젝트 진행 이력

> 새 세션 시작 시 이 파일을 먼저 읽어 현재 상태를 파악한다.
> Phase 완료 시 반드시 이 문서를 업데이트한다.

---

## 현재 상태

| 항목 | 내용 |
|---|---|
| 마지막 업데이트 | 2026-06-04 |
| 완료된 Phase | Phase 0 ✅, Phase 1 ✅, Phase 2 ✅, Phase 3 ✅, Phase 4 ✅, Phase 5 ✅ |
| 다음 작업 | Phase 6 — 데이터 시각화 및 분석 |
| 빌드 상태 | ✅ `npx tsc --noEmit` 통과, ESLint 통과 |

---

## Phase 계획

| Phase | 내용 | 상태 |
|---|---|---|
| 0 | 환경 설정 (Next.js, Prisma, Supabase, NextAuth, shadcn/ui, Resend) | ✅ |
| 1 | 레이아웃 / 공통 UI 컴포넌트 (shadcn/ui 기반, Header, Footer) | ✅ |
| 2 | 지원 기록 및 전형 단계 관리 (API Routes + Prisma CRUD) | ✅ |
| 3 | 면접 노트 및 상세 회고 (질문/답변, 잘한 점, 부족했던 점, 개선점) | ✅ |
| 4 | 통합 캘린더 및 D-Day 표시 (react-big-calendar + Vercel Cron + Resend 알림) | ✅ |
| 5 | 개인 맞춤형 대시보드 (Recharts 차트, 지원 현황 요약) | ✅ |
| 6 | 데이터 시각화 및 분석 (추이 차트, 전환율, 자주 나온 질문 유형) | ⏳ |
| 7 | 마무리 (NextAuth 인증 완성, Supabase Storage, SEO, 성능 최적화, 배포) | ⏳ |

---

## 현재 파일 구조

```
hirestory/
├── CLAUDE.md
├── vercel.json
├── components.json          ← shadcn/ui 설정
├── prisma/
│   └── schema.prisma        ← User, Application, InterviewNote, Question, Account, Session
├── docs/
│   └── history.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   │       └── button.tsx   ← shadcn/ui Button
│   └── lib/
│       ├── prisma.ts        ← Prisma Client 싱글턴
│       ├── resend.ts        ← Resend 클라이언트
│       ├── formatDate.ts    ← formatDate / getDDay
│       └── utils.ts         ← cn() (shadcn 생성)
└── public/
```

---

## 핵심 타입 요약

> Phase 진행하며 주요 타입 확정 시 여기에 추가한다.

```typescript
// Phase 2 완료 후 추가 예정
// interface Application { id, companyName, position, postingUrl, appliedAt, stage, memo }
// type ApplicationStage = '지원' | '서류' | '인적성' | '면접' | '최종' | '합격' | '불합격'

// Phase 3 완료 후 추가 예정
// interface InterviewNote { id, applicationId, interviewAt, type, questions, retrospective }
// interface InterviewQuestion { id, question, answer }
// interface Retrospective { good: string; bad: string; improve: string }
```

---

## UI 컴포넌트 패턴 규칙

> Phase 진행하며 합의된 패턴을 여기에 기록한다.

- 클래스 병합은 `cn()` 유틸 사용 (`src/lib/cn.ts`)
- variant는 Record 객체 조회 방식 사용, switch 금지
- Tailwind CSS v4 사용 (CSS 변수 기반)

---

## 완료된 작업 상세

### Phase 0 — 환경 설정 ✅
- [x] 완료 날짜: 2026-05-31
- [x] 작업 내용:
  - [x] Next.js 15 프로젝트 생성 (TypeScript strict, App Router, Tailwind)
  - [x] shadcn/ui 초기화 (`components.json`, `button.tsx`, `utils.ts`)
  - [x] Prisma 설치 + `schema.prisma` 전체 모델 작성
        (User, Application/ApplicationStage enum, InterviewNote, Question, NextAuth 모델)
  - [x] NextAuth beta 설치
  - [x] Resend 설치
  - [x] Recharts, react-big-calendar, @types/react-big-calendar 설치
  - [x] `src/lib/prisma.ts` — Prisma Client 싱글턴
  - [x] `src/lib/resend.ts` — Resend 클라이언트
  - [x] `src/lib/formatDate.ts` — formatDate / getDDay 유틸
  - [x] `.env.local` — 키 목록 구성 (값은 미입력, Supabase 연결 시 채울 것)
  - [x] `vercel.json` — Cron Jobs 설정 (매일 오전 9시 D-Day 알림)
  - [x] GitHub remote 연결 (`https://github.com/zzizi6/hirestory.git`)
  - [x] `npx tsc --noEmit` 통과
  - [ ] **미완료**: Supabase 프로젝트 생성 및 `DATABASE_URL` / `DIRECT_URL` 입력
  - [ ] **미완료**: `prisma migrate dev` 실행하여 DB 테이블 생성
  - [ ] **미완료**: `src/lib/auth.ts` — NextAuth 설정 파일 작성

### Phase 1 — 레이아웃 / 공통 UI 컴포넌트 ✅
- [x] 완료 날짜: 2026-05-31
- [x] 작업 내용:
  - [x] `src/components/layout/Header.tsx` — sticky 헤더, 로고(Briefcase 아이콘), 네비게이션 4개, 로그인 버튼
  - [x] `src/components/layout/Footer.tsx` — copyright 푸터
  - [x] `src/app/layout.tsx` — metadata 한국어화, lang="ko", Header/Footer 삽입
  - [x] `src/app/page.tsx` — 랜딩 페이지 (Hero + 핵심 기능 3개 카드)
  - [x] `npx tsc --noEmit` 통과, ESLint 통과

### Phase 2 — 지원 기록 및 전형 단계 관리 ✅
- [x] 완료 날짜: 2026-06-04
- [x] 작업 내용:
  - [x] `src/types/application.ts` — ApplicationStage, buildStages(), STAGE_TO_KOREAN, KOREAN_TO_STAGE
  - [x] `src/components/features/applications/StageBadge.tsx` — 단계별 색상 뱃지
  - [x] `src/components/features/applications/ApplicationForm.tsx` — 인적성/면접 2차 체크박스, 동적 단계 드롭다운, POST API 연결
  - [x] `src/components/features/applications/ApplicationCard.tsx` — 카드 컴포넌트
  - [x] `src/app/applications/page.tsx` — GET /api/applications fetch
  - [x] `src/app/applications/new/page.tsx` — ApplicationForm 래퍼
  - [x] `src/app/api/applications/route.ts` — GET(전체) + POST(인증 필요)
  - [x] `src/app/api/applications/[id]/route.ts` — PATCH + DELETE (인증 필요)
  - [x] `src/lib/auth.ts` — NextAuth v5 기본 설정
  - [x] `src/app/api/auth/[...nextauth]/route.ts` — handlers export
  - [x] `prisma/schema.prisma` — INTERVIEW_1/2 분리, hasAptitude/hasSecondInterview 추가
  - [x] `prisma.config.ts` — .env.local 직접 로드, directUrl 추가
  - [x] `npx tsc --noEmit` 통과, ESLint 통과

### Phase 3 — 면접 노트 및 상세 회고 ✅
- [x] 완료 날짜: 2026-06-04
- [x] 작업 내용:
  - [x] `src/types/interview.ts` — InterviewNote, InterviewQuestion, InterviewNoteFormData, INTERVIEW_TYPES
  - [x] `src/app/api/interviews/route.ts` — GET(전체, questions/application 포함) + POST(인증 필요)
  - [x] `src/app/api/interviews/[id]/route.ts` — PATCH + DELETE (인증 필요)
  - [x] `src/components/features/interviews/InterviewNoteCard.tsx` — 면접 노트 카드
  - [x] `src/components/features/interviews/InterviewNoteForm.tsx` — 지원 기록 드롭다운, Q&A 동적 추가/삭제, 회고 3항목
  - [x] `src/app/interviews/page.tsx` — GET /api/interviews fetch, 목록 렌더링
  - [x] `src/app/interviews/new/page.tsx` — InterviewNoteForm 래퍼
  - [x] `npx tsc --noEmit` 통과, ESLint 통과

### Phase 4 — 통합 캘린더 및 D-Day 표시 ✅
- [x] 완료 날짜: 2026-06-04
- [x] 작업 내용:
  - [x] `src/types/calendar.ts` — CalendarEvent, CalendarEventType 타입
  - [x] `src/types/application.ts` — deadlineAt / interviewAt / resultAt 필드 추가
  - [x] `src/app/api/applications/route.ts` — GET/POST 날짜 3개 반영
  - [x] `src/app/api/applications/[id]/route.ts` — PATCH 날짜 3개 반영
  - [x] `src/components/features/applications/ApplicationForm.tsx` — 일정 입력 필드 3개 추가
  - [x] `src/app/api/calendar/route.ts` — Application 날짜를 CalendarEvent로 통합 반환
  - [x] `src/components/features/calendar/CalendarView.tsx` — react-big-calendar (momentLocalizer, 한국어)
  - [x] `src/app/calendar/page.tsx` — 캘린더 페이지 + 색상 범례
  - [x] `src/app/api/cron/notify-dday/route.ts` — Vercel Cron D-Day 당일 Resend 이메일 알림
  - [x] `npx tsc --noEmit` 통과, ESLint 통과
  - [ ] **참고**: `.env.local`에 `CRON_SECRET` 추가 필요

### Phase 5 — 개인 맞춤형 대시보드 ✅
- [x] 완료 날짜: 2026-06-04
- [x] 작업 내용:
  - [x] `src/types/dashboard.ts` — DashboardData, StageCount, MonthCount 타입
  - [x] `src/app/api/dashboard/route.ts` — 전체/진행중/합격/불합격 집계 + 단계별/월별 건수
  - [x] `src/components/features/dashboard/SummaryCards.tsx` — 요약 카드 4개
  - [x] `src/components/features/dashboard/StageBarChart.tsx` — Recharts 막대 차트 (단계별)
  - [x] `src/components/features/dashboard/MonthlyLineChart.tsx` — Recharts 라인 차트 (월별)
  - [x] `src/app/dashboard/page.tsx` — 대시보드 페이지 (Server Component)
  - [x] `npx tsc --noEmit` 통과, ESLint 통과

### Phase 6 — 데이터 시각화 및 분석
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

### Phase 7 — 마무리
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

---

## 컨텍스트 복구 가이드

```bash
# 1. 프로젝트 이동
cd /Users/zzizi/Desktop/project/hirestory

# 2. 이력 확인
cat docs/history.md

# 3. 파일 구조 확인
find src -type f | sort

# 4. 빌드 상태 확인
npx tsc --noEmit && echo "✅ OK"
```

---

## 유틸 코드 스니펫 (재사용 가능)

### `src/lib/prisma.ts` — Prisma Client 싱글턴
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `src/lib/cn.ts` — Tailwind 클래스 병합
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/lib/formatDate.ts` — 날짜 포맷 / D-Day 계산
```typescript
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDDay(targetDate: string | Date): string {
  const diff = Math.ceil(
    (new Date(targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "D-Day";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}
```

### `.env.local` 필수 키 목록
```bash
DATABASE_URL=              # Supabase PostgreSQL connection string
DIRECT_URL=                # Supabase direct URL (migration용)
NEXTAUTH_URL=              # http://localhost:3000 (개발) / 배포 URL
NEXTAUTH_SECRET=           # openssl rand -base64 32 로 생성
RESEND_API_KEY=            # Resend 대시보드에서 발급
```

### `vercel.json` — Cron Jobs (D-Day 알림)
```json
{
  "crons": [
    {
      "path": "/api/cron/notify-dday",
      "schedule": "0 9 * * *"
    }
  ]
}
```
