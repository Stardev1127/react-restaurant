import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Lazy load so this isn't in the prod bundle
const DevTools = React.lazy(() => import("./mocks/DevTools"));

const useDevTools = import.meta.env.VITE_ENABLE_DEVTOOLS === "Y";

const queryClient = new QueryClient();

// Warning: StrictMode will render twice in dev only. This can catch subtle bugs.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Oops! Sorry, an error occurred.</h1>}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Toaster />
          {useDevTools ? <DevTools /> : <App />}
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
