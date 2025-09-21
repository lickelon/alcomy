import { createBrowserRouter } from "react-router-dom";

import LandingRoute from "@/features/landing/route";

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
        element: <LandingRoute />,
      },
    ],
  },
]);
