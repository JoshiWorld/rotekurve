import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const logRouter = createTRPCRouter({
  getLogs: protectedProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ ctx, input }) => {
    const logs = await ctx.db.log.findMany({
      orderBy: { createdAt: "desc" },
      where: { updatedPost: { id: input.id }},
      include: { updatedBy: true },
    });

    return logs.map(log => ({
      ...log,
      updatedBy: log.updatedBy.name,
    }));
  }),
});