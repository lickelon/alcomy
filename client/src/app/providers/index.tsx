import { Suspense } from "react";
import { Toaster } from "sonner";

import { ApolloProviderWithSuspense } from "./apollo.tsx";
import { ThemeProviderWithSystem } from "./theme.tsx";

import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProviderWithSystem>
      <ApolloProviderWithSuspense>
        <Suspense fallback={<GlobalFallback />}>{children}</Suspense>
        <Toaster position="top-right" richColors closeButton />
      </ApolloProviderWithSuspense>
    </ThemeProviderWithSystem>
  );
}

function GlobalFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="space-y-2 text-center">
        <div className="font-medium text-muted-foreground text-sm">
          Loading workspace…
        </div>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-1/2 animate-[pulse_0.8s_ease-in-out_infinite] bg-primary" />
        </div>
      </div>
    </div>
  );
}
