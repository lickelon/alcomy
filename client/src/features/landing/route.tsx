import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Layers,
  MonitorSmartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useMemo } from "react";

import NewsletterForm from "@/components/forms/NewsletterForm";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface VersionQueryData {
  version: string;
}

const VERSION_QUERY = gql`
  query Version {
    version
  }
`;

const accentStyles: Record<"blue" | "purple" | "amber", string> = {
  blue: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
  purple: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
  amber: "bg-amber-500/10 text-amber-500 ring-amber-500/25",
};

const productHighlights: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  accent: keyof typeof accentStyles;
}> = [
  {
    title: "React 19 & TypeScript 5",
    description: "Concurrent 특성과 타입 안정성을 기본으로 갖춘 환경입니다.",
    icon: Layers,
    accent: "blue",
  },
  {
    title: "Apollo GraphQL",
    description:
      "캐싱·에러·Suspense 전략을 고려한 Apollo Client 구성이 포함됩니다.",
    icon: Workflow,
    accent: "purple",
  },
  {
    title: "Tailwind CSS 4",
    description: "@theme 토큰 기반 스타일 시스템으로 빠르게 UI를 확장하세요.",
    icon: Sparkles,
    accent: "amber",
  },
];

const quickStartTimeline = [
  {
    title: "스타일 시스템 구성",
    description:
      "Tailwind CSS v4 토큰과 shadcn UI 프리미티브로 기본 레이아웃을 정리합니다.",
  },
  {
    title: "GraphQL 연결",
    description:
      "`.env` 또는 환경 변수에서 `VITE_GRAPHQL_URL`을 설정하고 Apollo Provider에 주입합니다.",
  },
  {
    title: "데이터 모델 정의",
    description:
      "GraphQL Codegen으로 타입 안전을 확보하고 Suspense 대응 fetch 로직을 설계합니다.",
  },
  {
    title: "페이지 구축",
    description:
      "React Router 7 레이아웃을 정의하고 UI와 데이터를 결합해 화면을 구성합니다.",
  },
];

const workspaceOverview = [
  {
    badge: "client/",
    title: "프런트엔드 워크스페이스",
    description:
      "Vite + React Router 기반 애플리케이션에 Tailwind CSS와 shadcn UI가 세팅되어 있습니다.",
    bullets: [
      "GraphQL Code Generator 템플릿",
      "테마 토큰 기반 스타일 시스템",
      "App Shell · Layout 컴포지션 샘플",
    ],
  },
  {
    badge: "server/",
    title: "백엔드 워크스페이스",
    description:
      "FastAPI · Strawberry GraphQL 스택으로 REST와 GraphQL 엔드포인트를 동시에 제공합니다.",
    bullets: [
      "GraphQL 스키마 & 리졸버 예제",
      "SQLAlchemy 리포지터리 패턴",
      "Alembic 마이그레이션 파이프라인",
    ],
  },
];

const resourceLinks = [
  {
    title: "프로젝트 README",
    description: "폴더 구조와 실행 스크립트를 빠르게 파악하세요.",
    href: "https://github.com/",
    icon: BookOpen,
  },
  {
    title: "Apollo Client 가이드",
    description: "캐싱 전략과 Suspense 통합 패턴을 자세히 살펴봅니다.",
    href: "https://www.apollographql.com/docs/react",
    icon: Compass,
  },
  {
    title: "Tailwind CSS 문서",
    description: "테마 토큰과 최신 유틸리티 사용법을 익혀 보세요.",
    href: "https://tailwindcss.com/docs",
    icon: MonitorSmartphone,
  },
];

interface ConnectionState {
  badge: string;
  tone: string;
  label: string;
  helper: string;
}

function getConnectionState(
  loading: boolean,
  error: unknown,
  version: string | null,
): ConnectionState {
  if (loading) {
    return {
      badge: "연결 중",
      tone: "text-primary",
      label: "GraphQL 엔드포인트 확인 중입니다.",
      helper: "Apollo Client가 서버 스키마를 탐색하고 있습니다.",
    };
  }

  if (error instanceof Error) {
    return {
      badge: "오류",
      tone: "text-destructive",
      label: "GraphQL 엔드포인트에 연결하지 못했습니다.",
      helper: error.message,
    };
  }

  if (!version) {
    return {
      badge: "대기",
      tone: "text-muted-foreground",
      label: "GraphQL 서버가 아직 응답하지 않습니다.",
      helper: "FastAPI 앱과 Uvicorn 프로세스를 먼저 활성화하세요.",
    };
  }

  return {
    badge: "정상",
    tone: "text-emerald-500",
    label: `GraphQL 서버 버전 v${version}`,
    helper: "Apollo Client 요청이 정상적으로 응답하고 있습니다.",
  };
}

export default function LandingRoute() {
  const { data, loading, error } = useQuery<VersionQueryData>(VERSION_QUERY, {
    fetchPolicy: "cache-first",
  });

  const version = data?.version ?? null;

  const connectionState = useMemo(
    () => getConnectionState(loading, error, version),
    [loading, error, version],
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.15)_0%,_transparent_65%)] text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,_hsl(var(--primary)_/_0.12),_transparent_55%),_radial-gradient(circle_at_85%_10%,_hsl(var(--accent,_var(--primary))_/_0.08),_transparent_55%)]"
      />

      <header className="relative z-10 px-6 py-12 sm:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/85 p-10 shadow-xl backdrop-blur">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)_/_0.16),_transparent_55%)]"
              aria-hidden
            />
            <div
              className="absolute right-10 top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary">
                Alcomy Frontend Kit
              </span>
              <div className="space-y-5">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.35rem] md:leading-[1.05]">
                  모던 웹 제품을 위한 React · Tailwind · GraphQL 스타터
                </h1>
                <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
                  프런트엔드와 백엔드 템플릿을 한 번에 제공하는 풀스택 킷입니다.
                  React 19, Apollo Client, Tailwind CSS 4 조합으로 프로덕션
                  수준의 경험을 빠르게 구축해 보세요.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  href="#"
                >
                  스타터 살펴보기
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                  href="#"
                >
                  배포 가이드 보기
                </a>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productHighlights.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm transition hover:shadow-lg"
              >
                <div
                  className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-primary/5 blur-3xl"
                  aria-hidden
                />
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-1",
                      accentStyles[item.accent],
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </header>

      <main className="relative z-10 px-6 pb-16 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.25fr_1fr]">
          <section className="space-y-6">
            <ConnectionCard state={connectionState} />

            <article className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h2 className="text-base font-semibold">
                    Quickstart 타임라인
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    아래 순서를 따라가면 전체 스택을 빠르게 자신의 프로젝트로
                    만들 수 있습니다.
                  </p>
                </div>
              </div>

              <ol className="mt-6 space-y-4">
                {quickStartTimeline.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative flex gap-4 rounded-2xl border border-border/60 bg-background/70 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <NewsletterForm />
          </section>

          <section className="space-y-6">
            {workspaceOverview.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm backdrop-blur"
              >
                <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  {section.badge}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {section.bullets.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <article className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm backdrop-blur">
              <h3 className="text-lg font-semibold">문서 & 리소스</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                스택 이해를 돕는 레퍼런스와 가이드를 모았습니다.
              </p>
              <ul className="mt-5 space-y-3">
                {resourceLinks.map((resource) => (
                  <li key={resource.title}>
                    <a
                      className="group flex items-start gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
                      href={resource.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <resource.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                          {resource.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {resource.description}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/60 bg-background/85 py-6 text-center text-xs text-muted-foreground">
        React 19 · Tailwind CSS 4 · Apollo Client 4 · React Router 7 · FastAPI
      </footer>
    </div>
  );
}

function ConnectionCard({ state }: { state: ConnectionState }) {
  return (
    <article className="rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">
            GraphQL 연결 상태
          </p>
          <p className={cn("text-lg font-semibold", state.tone)}>
            {state.label}
          </p>
        </div>
        <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {state.badge}
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{state.helper}</p>
    </article>
  );
}
