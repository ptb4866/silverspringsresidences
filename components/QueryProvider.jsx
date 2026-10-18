"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider({ children }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {import.meta.env.DEV && import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
