import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { trpc } from "./trpc/client";
import { trpcClient, queryClient } from "./trpc/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
