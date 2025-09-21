import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
