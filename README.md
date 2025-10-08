# Alcomy Monorepo

풀스택 실험용 워크스페이스입니다. 하나의 저장소에서 프런트엔드(React 19)와 백엔드(FastAPI + Strawberry GraphQL)를 함께 다루며, 최신 Tailwind CSS 4·shadcn/ui 기반 UI 킷과 Apollo Client 4 구성을 제공합니다.

## 구성 개요
- **client/**
  - React 19 + Vite 7 + TypeScript 5
  - React Router 7, Apollo Client 4 (Suspense 대응), shadcn/ui 기반 컴포넌트 세트
  - Tailwind CSS 4 (@theme 토큰) + sonner, cmdk, vaul 등 생태계 연동
  - 주요 엔트리: `client/src/main.tsx`, `client/src/app/router.tsx`, `client/src/app/providers`
- **server/**
  - FastAPI · Strawberry GraphQL · SQLModel · Alembic
  - GraphQL 엔드포인트 `/graphql`, REST 엔드포인트 `/api`
  - 설정은 `.env`(pydantic-settings)로 주입, 기본 DB는 Postgres

## 요구 사항
- macOS/Linux 기준 도구
  - Node.js 22.5.1, pnpm 9.4.0 (asdf 사용 시 `.tool-versions` 자동 설치)
  - Python 3.12.4 + [uv](https://github.com/astral-sh/uv)
  - Docker & Docker Compose
- asdf 활용 시
  ```sh
  asdf plugin add nodejs
  asdf plugin add pnpm
  asdf plugin add python
  asdf install
  ```

## 의존성 설치
```sh
pnpm install
uv sync
```

## 환경 변수
- **Client**: `VITE_GRAPHQL_URL` (기본값 `http://localhost:8000/graphql`). `.env.local` 등에 설정하면 Vite에서 자동 주입됩니다.
- **Server**: `.env`를 `server/` 루트에 두고 다음 값 조정 가능
  - `DATABASE_URL` (기본값 `postgresql+psycopg://postgres:postgres@localhost:5432/alcomy`)
  - `CORS_ORIGINS`, `APP_NAME`, `DEBUG` 등

## 실행 방법
### Justfile 활용
```sh
just install        # pnpm install + uv sync
just run            # db + server + client 동시 실행
just run db         # Postgres 컨테이너 실행 (로그 따라가다가 Ctrl+C로 종료)
just run server     # uvicorn 개발 서버
just run client     # Vite 개발 서버
just docker up      # docker compose up -d db
just docker down    # docker compose down
```

### 수동 실행
1. Postgres
   ```sh
   docker compose up -d db
   ```
2. FastAPI
   ```sh
   uv run --pythonpath server uvicorn app.main:app --reload
   ```
3. React Dev Server
   ```sh
   pnpm dev
   ```

## 개발 워크플로
- 정적 분석 & 포맷팅
  ```sh
  pnpm lint        # Biome lint
  pnpm format      # Biome format --write
  pnpm typecheck   # tsc --noEmit
  pnpm build       # tsc --noEmit && vite build
  ```
- UI 컴포넌트는 `client/src/components/ui` 이하에 shadcn CLI로 동기화되어 있습니다. Tailwind 토큰은 `client/src/styles.css`의 `@theme` 섹션에서 관리하며, 필요 시 shadcn CLI(`pnpm dlx shadcn@latest add ...`)로 컴포넌트를 추가할 수 있습니다.
- 공용 Provider 스택은 `client/src/app/providers`, 라우터 정의는 `client/src/app/router.tsx`, 기능별 화면은 `client/src/features`에 위치합니다.

## 데이터베이스 & 마이그레이션
```sh
# 새 마이그레이션 생성
uv run alembic revision --autogenerate -m "init"

# 최신 스키마 적용
uv run alembic upgrade head
```

## 유틸 링크
- [Tailwind CSS 4 문서](https://tailwindcss.com/docs)
- [shadcn/ui CLI 가이드](https://ui.shadcn.com/docs/cli)
- [Apollo Client React 가이드](https://www.apollographql.com/docs/react)
- [Strawberry GraphQL](https://strawberry.rocks/docs)

