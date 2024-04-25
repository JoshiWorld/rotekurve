import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
      title: z.string().min(1), 
      content: z.string().min(1),
      fileSrc: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          image: `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${input.fileSrc}`,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getPostByUser: protectedProcedure.input(z.object({ name: z.string().min(1) })).query(({ ctx, input }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { name: input.name } }
    })
  }),

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" }
    })
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});