import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="space-y-4 text-center">
          <h1 className="font-semibold text-3xl">{error.status}</h1>
          <p className="text-muted-foreground text-sm">{error.statusText}</p>
        </div>
      </div>
    );
  }

  const fallbackMessage =
    error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="space-y-4 text-center">
        <h1 className="font-semibold text-3xl">오류</h1>
        <p className="text-muted-foreground text-sm">{fallbackMessage}</p>
      </div>
    </div>
  );
}
