import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import nodemailer from "nodemailer";
import { env } from "@/env";

export const contactRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { firstname, lastname, email, content } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const transporter = nodemailer.createTransport({
        host: env.SES_HOST,
        port: 587, // oder 465 für SSL
        secure: false, // true für 465, false für andere Ports
        auth: {
          user: env.SES_USER,
          pass: env.SES_PASSWORD,
        },
      });

      const htmlContent = `
        <h1>Kontaktformular</h1>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Anliegen:</strong> ${content}</p>
      `;

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await transporter.sendMail({
          from:
            '"' +
            firstname +
            " " +
            lastname +
            '" <kontakt@rotekurve-supporters.de>', // Absenderadresse
          to: "kontakt@rotekurve-supporters.de", // Empfängeradresse
          subject: "Kontakt | " + firstname + " " + lastname, // Betreff
          text: `Name: ${firstname} ${lastname}\nEmail: ${email}\nAnliegen: ${content}`,
          html: htmlContent, // HTML-Body
        });

        return { message: "Email sent successfully" };
      } catch (error) {
        console.error(error);
        return { message: "Error sending email" };
      }
    }),

  createSocial: publicProcedure
    .input(
      z.object({
        href: z.string().min(1),
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { href, title } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.socialLinks.create({
        data: { href, title },
      });
    }),

  getSocials: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.socialLinks.findMany();
  }),

  updateSocial: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        href: z.string().min(1).optional(),
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, href, title } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.socialLinks.update({
        where: { id },
        data: { href, title },
      });
    }),

  deleteSocial: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.socialLinks.delete({
        where: { id },
      });
    }),

  getSocialById: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.socialLinks.findUnique({
        where: { id },
      });
    }),
});
