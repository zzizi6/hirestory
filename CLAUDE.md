# CLAUDE.md

> 새 세션 시작 시 이 파일을 먼저 읽는다.
> 모든 작업은 이 파일의 규칙을 따른다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | Hirestory |
| 목적 | 취업 준비 과정(지원 기록, 면접 노트, 일정)을 한 곳에서 통합 관리하는 웹앱 |
| 프론트엔드 | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Recharts, react-big-calendar |
| 백엔드 | Next.js API Routes, Prisma, PostgreSQL, NextAuth, Resend |
| 인프라 | Vercel, Supabase (DB + Storage), GitHub Actions, Vercel Cron Jobs |
| 패키지 매니저 | npm |
| 현재 상태 | Phase 0 시작 전 |
| 다음 작업 | Next.js 프로젝트 생성 및 환경 설정 |

---

## 2. 작업 흐름 (필수 순서)

모든 작업은 아래 순서를 반드시 따른다.

1. **탐색** — 관련 파일을 읽고 현재 구조 파악
2. **계획** — 변경할 파일 목록과 이유를 나열하고 승인 대기
3. **구현** — 파일 단위로 작업 (한 번에 하나씩)
4. **검증** — 아래 quality-gate 순서대로 실행
5. **실패 시** — 전체 재작성 금지, 실패 원인만 수정

> 계획 승인 없이 코딩 시작 금지

---

## 3. Quality Gate (검증 명령어)

아래 순서대로 실행한다. 하나라도 실패하면 즉시 중단하고 수정한다.

```bash
# 1. 타입 체크
npx tsc --noEmit

# 2. 린트
npx eslint .

# 3. Prisma 스키마 검증
npx prisma validate

# 4. 빌드
npm run build
```

---

## 4. 코딩 컨벤션

### 파일 명명
- 컴포넌트: `PascalCase.tsx`
- 훅/유틸/타입: `camelCase.ts`
- 폴더: `kebab-case/`

### TypeScript
- `strict: true` 필수
- `any` 금지 → `unknown` 사용
- Props 타입: `{ComponentName}Props`

### 금지 사항
- `console.log` 커밋 금지
- 계획 없는 구현 시작 금지
- 인라인 스타일 금지 (Tailwind 유틸리티 클래스 사용)
- Prisma Client를 컴포넌트에서 직접 import 금지 → API Route 또는 Server Action 경유
- `.env.local` 커밋 금지 (NextAuth secret, DB URL, Resend API key 포함)

---

## 5. 폴더 구조

```
hirestory/
├── CLAUDE.md
├── prisma/
│   └── schema.prisma    ← DB 스키마 (Supabase PostgreSQL)
├── docs/
│   ├── history.md       ← 진행 이력 (Phase 완료 시 업데이트)
│   └── structure.md     ← 폴더 구조 상세
├── src/
│   ├── app/
│   │   ├── api/         ← API Routes (Prisma 접근은 여기서만)
│   │   │   ├── auth/    ← NextAuth 핸들러
│   │   │   ├── applications/
│   │   │   ├── interviews/
│   │   │   └── cron/    ← Vercel Cron Jobs (D-Day 알림)
│   │   └── (pages)/     ← App Router 페이지
│   ├── components/
│   │   ├── ui/          ← shadcn/ui 기반 원자 컴포넌트
│   │   └── features/    ← 도메인별 복합 컴포넌트
│   │       ├── applications/  ← 지원 기록
│   │       ├── interviews/    ← 면접 노트
│   │       ├── calendar/      ← react-big-calendar
│   │       └── dashboard/     ← Recharts 차트
│   ├── lib/
│   │   ├── prisma.ts    ← Prisma Client 싱글턴
│   │   ├── auth.ts      ← NextAuth 설정
│   │   ├── resend.ts    ← Resend 메일 클라이언트
│   │   └── cn.ts        ← Tailwind 클래스 병합
│   ├── types/           ← 타입 정의
│   └── store/           ← 전역 클라이언트 상태 (필요 시)
└── public/
```

> 실제 구조와 다를 경우 `docs/structure.md`를 참조한다.

---

## 6. 상태 관리 원칙

| 상태 종류 | 도구 |
|---|---|
| 서버 데이터 | API Routes (`/api/...`) + `fetch` |
| 전역 클라이언트 상태 | Zustand (`src/store/`) — 필요 시 |
| 로컬 UI 상태 | `useState` |
| URL 상태 | `useSearchParams` / `useRouter` |
| 인증 세션 | `useSession` (NextAuth) |

---

## 7. 핵심 도메인

### 지원 기록 전형 단계
`지원` → `서류` → `인적성` → `면접` → `최종` → `합격` / `불합격`

### 면접 노트 구성
- 기본 정보: 회사명, 직무, 면접 일시, 면접 유형
- 질문/답변 기록
- 회고: 잘한 점, 부족했던 점, 개선점

### 캘린더 일정 유형
- 지원 마감일, 면접일, 결과 발표일

---

## 8. 품질 규칙

- **접근성**: `alt`, `aria-label`, 색상 대비 4.5:1 이상
- **성능**: 이미지 최적화 (`next/image` 사용)
- **보안**: 환경 변수는 `.env.local`, 커밋 금지
- **DB**: Prisma migration은 `prisma migrate dev` (개발) / `prisma migrate deploy` (프로덕션)
- **인증**: API Route에서 `getServerSession()` 으로 세션 검증 필수
- **이메일**: Resend는 `src/lib/resend.ts` 통해서만 호출
- **Cron**: D-Day 알림은 `src/app/api/cron/` + `vercel.json` cron 설정으로 처리

---

## 9. 컨텍스트 복구 (새 세션 시작 시)

```bash
# 1. 진행 이력 확인
cat docs/history.md

# 2. 파일 구조 확인
find src -type f | sort

# 3. 빌드 상태 확인
npx tsc --noEmit && echo "✅ OK"
```

---

## 10. ECC 커맨드

| 상황 | 커맨드 |
|---|---|
| 새 기능 계획 | `/ecc:plan "작업 내용"` |
| 코드 리뷰 | `/code-review` |
| 빌드 에러 수정 | `/build-fix` |
| 검증 실행 | `/quality-gate` |
| 보안 감사 | `/security-scan` |

---

## 11. 작업 기록

Phase 완료 시 `docs/history.md`의 완료 섹션을 업데이트한다.
