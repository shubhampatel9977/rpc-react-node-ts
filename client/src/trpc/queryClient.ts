import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { trpc } from "./client";

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
