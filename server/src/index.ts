import express from "express";
import cors from "cors";
import { appRouter } from "./routers/appRouter";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.listen(4000, () => {
  console.log("tRPC server running on http://localhost:4000/trpc");
});
