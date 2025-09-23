import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex items-center justify-between">
          <NavLink to="/" className="font-semibold text-lg">
            alcomy
          </NavLink>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: isActive ? "default" : "ghost",
                    size: "sm",
                  }),
                )
              }
              end
            >
              홈
            </NavLink>
            <NavLink
              to="/uitest"
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: isActive ? "default" : "ghost",
                    size: "sm",
                  }),
                )
              }
            >
              UI 테스트
            </NavLink>
          </nav>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
}
