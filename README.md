# Hirestory

취업 준비의 모든 기록을 한 곳에서 — 지원 기록, 면접 노트, 일정을 통합 관리하는 웹앱입니다.

> **학습 목적 프로젝트입니다.**  
> [Everything Claude Code(ECC)](https://github.com/anthropics/everything-claude-code) 하네스를 활용해 Claude Code와 함께 개발하는 방식을 익히기 위해 만들고 있습니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router, TypeScript) |
| 스타일 | Tailwind CSS v4, shadcn/ui |
| DB | Supabase (PostgreSQL) + Prisma ORM |
| 인증 | NextAuth v5 |
| 이메일 | Resend |
| 차트 | Recharts |
| 캘린더 | react-big-calendar |
| 배포 | Vercel |

---

## 개발 방식

- **ECC 하네스** — Everything Claude Code의 훅, 태스크, 에이전트 시스템을 활용
- **Phase 단위 개발** — 기능을 Phase로 나눠 계획 → 구현 → 검증 순서로 진행
- **CLAUDE.md 기반** — 세션마다 컨텍스트를 복구하며 일관된 컨벤션 유지

---

## Phase 진행 현황

| Phase | 내용 | 상태 |
|---|---|---|
| 0 | 환경 설정 (Next.js, Prisma, Supabase, NextAuth, shadcn/ui, Resend) | ✅ |
| 1 | 레이아웃 / 공통 UI 컴포넌트 | ✅ |
| 2 | 지원 기록 및 전형 단계 관리 (API + CRUD) | ✅ |
| 3 | 면접 노트 및 상세 회고 | ⏳ |
| 4 | 통합 캘린더 및 D-Day 표시 | ⏳ |
| 5 | 개인 맞춤형 대시보드 | ⏳ |
| 6 | 데이터 시각화 및 분석 | ⏳ |
| 7 | 마무리 (인증 완성, SEO, 성능 최적화, 배포) | ⏳ |

---

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, RESEND_API_KEY 입력

# DB 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.
