import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const linksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
      description: z.string().min(1),
      title: z.string().min(1),
      href: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.link.create({
        data: {
          description: input.description,
          title: input.title,
          href: input.href,
        },
      });
    }),

  getLinks: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.link.findMany();
  }),

  delete: protectedProcedure.input(z.object({
    id: z.string().min(1),
  })).mutation(async ({ ctx, input }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.link.delete({
      where: { id: input.id }
    });
  }),
});