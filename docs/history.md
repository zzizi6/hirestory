# 프로젝트 진행 이력

> 새 세션 시작 시 이 파일을 먼저 읽어 현재 상태를 파악한다.
> Phase 완료 시 반드시 이 문서를 업데이트한다.

---

## 현재 상태

| 항목 | 내용 |
|---|---|
| 마지막 업데이트 | 2026-05-31 |
| 완료된 Phase | 없음 |
| 다음 작업 | Phase 0 — Next.js 프로젝트 생성 및 환경 설정 |
| 빌드 상태 | ⏳ 미확인 |

---

## Phase 계획

| Phase | 내용 | 상태 |
|---|---|---|
| 0 | 환경 설정 (Next.js, Prisma, Supabase, NextAuth, shadcn/ui, Resend) | ⏳ |
| 1 | 레이아웃 / 공통 UI 컴포넌트 (shadcn/ui 기반, Header, Footer) | ⏳ |
| 2 | 지원 기록 및 전형 단계 관리 (API Routes + Prisma CRUD) | ⏳ |
| 3 | 면접 노트 및 상세 회고 (질문/답변, 잘한 점, 부족했던 점, 개선점) | ⏳ |
| 4 | 통합 캘린더 및 D-Day 표시 (react-big-calendar + Vercel Cron + Resend 알림) | ⏳ |
| 5 | 개인 맞춤형 대시보드 (Recharts 차트, 지원 현황 요약) | ⏳ |
| 6 | 데이터 시각화 및 분석 (추이 차트, 전환율, 자주 나온 질문 유형) | ⏳ |
| 7 | 마무리 (NextAuth 인증 완성, Supabase Storage, SEO, 성능 최적화, 배포) | ⏳ |

---

## 현재 파일 구조

```
hirestory/
├── CLAUDE.md
├── docs/
│   └── history.md
└── (초기 상태 — Phase 0 완료 후 업데이트)
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

### Phase 0 — 환경 설정
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  - [ ] Next.js 15 프로젝트 생성 (TypeScript strict)
  - [ ] Tailwind CSS + shadcn/ui 설치
  - [ ] Prisma 설치 + Supabase PostgreSQL 연결
  - [ ] NextAuth 설치 및 기본 설정
  - [ ] Resend 설치
  - [ ] Recharts, react-big-calendar 설치
  - [ ] ESLint 설정
  - [ ] `src/lib/prisma.ts` — Prisma Client 싱글턴
  - [ ] `src/lib/auth.ts` — NextAuth 설정
  - [ ] `src/lib/resend.ts` — Resend 클라이언트
  - [ ] `src/lib/cn.ts` — 클래스 병합 유틸
  - [ ] `src/lib/formatDate.ts` — 날짜/D-Day 유틸
  - [ ] `.env.local` 구성 (DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY 등)
  - [ ] `vercel.json` — Cron Jobs 설정

### Phase 1 — 레이아웃 / 공통 UI 컴포넌트
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

### Phase 2 — 지원 기록 및 전형 단계 관리
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

### Phase 3 — 면접 노트 및 상세 회고
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

### Phase 4 — 통합 캘린더 및 D-Day 표시
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

### Phase 5 — 개인 맞춤형 대시보드
- [ ] 완료 날짜: YYYY-MM-DD
- [ ] 작업 내용:
  -

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
