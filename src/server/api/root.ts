import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { aboutusRouter } from "./routers/aboutus";
import { logRouter } from "./routers/log";
import { linksRouter } from "./routers/link";
import { userRouter } from "./routers/user";
import { contactRouter } from "./routers/contact";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  aboutus: aboutusRouter,
  log: logRouter,
  link: linksRouter,
  user: userRouter,
  contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
