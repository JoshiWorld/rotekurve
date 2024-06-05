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
});
