import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { AppProviders } from "./app/providers/index.tsx";
import { router } from "./app/router.tsx";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Root element with id "root" not found.');
}

createRoot(container).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
