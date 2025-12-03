import { z } from "zod";

import { router, publicProcedure } from "../trpc";

// In-memory DB (replace with real database later)
let users = [
  { id: 1, taskName: "React", taskDesc: "This is react project" },
  { id: 2, taskName: "React", taskDesc: "This is react project" },
  { id: 3, taskName: "React", taskDesc: "This is react project" },
  { id: 4, taskName: "React", taskDesc: "This is react project" },
  { id: 5, taskName: "React", taskDesc: "This is react project" },
  { id: 6, taskName: "React", taskDesc: "This is react project" },
];

export const userRouter = router({

  // CREATE
  create: publicProcedure
    .input(z.object({
      taskName: z.string(),
      taskDesc: z.string(),
    }))
    .mutation(({ input }) => {
      const newUser = {
        id: users.length + 1,
        ...input,
      };
      users.push(newUser);
      return newUser;
    }),

  // READ ALL
  list: publicProcedure
    .query(() => {
      return users;
    }),

  // READ SINGLE
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return users.find(u => u.id === input.id) ?? null;
    }),

  // UPDATE
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      email: z.string().email().optional(),
    }))
    .mutation(({ input }) => {
      const index = users.findIndex(u => u.id === input.id);
      if (index === -1) return null;

      users[index] = { ...users[index], ...input };
      return users[index];
    }),

  // DELETE
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      users = users.filter(u => u.id !== input.id);
      return { success: true };
    }),

});
