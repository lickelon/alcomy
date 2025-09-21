import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-semibold">{error.status}</h1>
          <p className="text-sm text-muted-foreground">{error.statusText}</p>
        </div>
      </div>
    );
  }

  const fallbackMessage =
    error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">오류</h1>
        <p className="text-sm text-muted-foreground">{fallbackMessage}</p>
      </div>
    </div>
  );
}
