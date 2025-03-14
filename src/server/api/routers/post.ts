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
      createdAt: z.date()
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          image: `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${input.fileSrc}`,
          createdBy: { connect: { id: ctx.session.user.id } },
          createdAt: input.createdAt
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

  getPostById: publicProcedure.input(z.object({ id: z.string().min(1) })).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({
      where: { id: input.id },
    })
  }),

  update: protectedProcedure
    .input(z.object({ 
      id: z.string().min(1),
      title: z.string().min(1), 
      content: z.string().min(1),
      archieved: z.boolean(),
      fileSrc: z.string().min(1).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, title, content, archieved } = input;

      return ctx.db.post.update({
        where: { id },
        data: {
          title,
          content,
          archieved,
          // image: `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${fileSrc}`,
        },
      }).then((post) => {
        return ctx.db.log.create({
          data: {
            updatedBy: { connect: { id: ctx.session.user.id } },
            updatedPost: { connect: { id: post.id } },
            updatedContent: content,
          },
        });
      });
    }),
});