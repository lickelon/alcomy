import { createBrowserRouter } from "react-router-dom";

import { LandingPage } from "@/features/landing-page";
import { UITestPage } from "@/features/ui-test";

import { RootErrorBoundary } from "./routes/root-error.tsx";
import RootLayout from "./routes/root-layout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "uitest",
        element: <UITestPage />,
      },
    ],
  },
]);
