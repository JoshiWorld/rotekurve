import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const aboutusRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.aboutUs.create({
        data: {
          content: input.content,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.aboutUs.findFirst();
  }),

  update: protectedProcedure
    .input(z.object({ 
        id: z.string().min(1),
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, content } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.aboutUs.update({
        where: { id },
        data: {
          content,
        },
      });
    }),
});