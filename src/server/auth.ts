import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import { compare } from 'bcrypt';
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/login',
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      }
    },
    redirect: async ({  }) => {
      return '/internal';
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Username",
      credentials: {
        username: { label: "Benutzername", type: "text" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { username: credentials!.username }
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (user && (await compare(credentials!.password || "", user.password))) {
          return user;
        }

        return null;

        // const hashedPassword = await hash(credentials!.password, 10);

        // const user = await db.user.create({
        //   data: {
        //     username: credentials!.username,
        //     password: hashedPassword,
        //   }
        // });

        // if(user) {
        //   return user;
        // } else {
        //   return null;
        // }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: env.NEXTAUTH_SECRET
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
