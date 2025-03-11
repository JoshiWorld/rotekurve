import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { hash } from "bcrypt";
import { Role } from "@prisma/client";

export const userRouter = createTRPCRouter({
    // Create user
    create: protectedProcedure
        .input(
            z.object({
                username: z.string().min(1),
                password: z.string().min(1),
                name: z.string().min(1),
                email: z.string().min(1).optional(),
                role: z.enum(['ADMIN', 'USER']).optional(),
            }),
            )
            .mutation(async ({ ctx, input }) => {
                const user = await ctx.db.user.findUnique({
                  where: {
                    id: ctx.session.user.id,
                  },
                });
                if (user?.role !== Role.ADMIN) throw new Error("Unauthorized");

                const hashedPassword = await hash(input.password, 10);

                return ctx.db.user.create({
                    data: {
                    username: input.username,
                    password: hashedPassword,
                    name: input.name,
                    email: input.email,
                    },
                });
            }),

    // Delete user
    delete: protectedProcedure
        .input(z.object({ id: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if (user?.role !== Role.ADMIN) throw new Error("Unauthorized");

            return ctx.db.user.delete({
                where: {
                    id: input.id,
                },
            });
        }),
    
    // Update user
    update: protectedProcedure
        .input(
            z.object({
                id: z.string().min(1),
                username: z.string().min(1),
                name: z.string().min(1),
                email: z.string().min(1),
                role: z.enum(['ADMIN', 'USER']),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if (user?.role !== Role.ADMIN) throw new Error("Unauthorized");

            return ctx.db.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    username: input.username,
                    name: input.name,
                    email: input.email,
                    role: input.role,
                },
            });
        }),

    // Get user by id
    getById: protectedProcedure
        .input(z.object({ id: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if (user?.role !== Role.ADMIN) throw new Error("Unauthorized");

            return ctx.db.user.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    // Get all users
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if (user?.role !== Role.ADMIN) throw new Error("Unauthorized");

            return ctx.db.user.findMany();
        }),
    
    // Get user by username
    getByUsername: protectedProcedure
        .input(z.object({ username: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if(user?.role !== Role.ADMIN) throw new Error('Unauthorized');

            return ctx.db.user.findUnique({
                where: {
                    username: input.username,
                },
            });
        }),
    
    // Get user by email
    getByEmail: protectedProcedure
        .input(z.object({ email: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if(user?.role !== Role.ADMIN) throw new Error('Unauthorized');

            return ctx.db.user.findUnique({
                where: {
                    email: input.email,
                },
            });
        }),
    
    // Get user by name that contains the input
    getByName: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
              where: {
                id: ctx.session.user.id,
              },
            });
            if(user?.role !== Role.ADMIN) throw new Error('Unauthorized');

            return ctx.db.user.findMany({
                where: {
                    name: {
                        contains: input.name,
                    },
                },
            });
        }),
});
