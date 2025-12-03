import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { userRouter } from "./userRouter";

export const appRouter = router({
  sayHello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => ({ message: `Hello, ${input.name}!` })),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
