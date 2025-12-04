import { z } from "zod";

import { router, publicProcedure } from "../trpc";

// In-memory DB (replace with real database)
let users = [
  { id: 1, taskName: "React", taskDesc: "This is react project" },
  { id: 2, taskName: "Node", taskDesc: "This is node project" },
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
        id: Date.now(),
        ...input,
      };
      users.push(newUser);
      return newUser;
    }),

  // READ ALL
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional().default(""),
      })
    )
    .query(({ input }) => {
      const { search } = input;

      if (!search) return users;

      const lower = search.toLowerCase();

      return users.filter(
        (item) =>
          item.taskName.toLowerCase().includes(lower) ||
          item.taskDesc.toLowerCase().includes(lower)
      );
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
      taskName: z.string().optional(),
      taskDesc: z.string().optional(),
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
