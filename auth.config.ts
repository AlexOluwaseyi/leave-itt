import type { NextAuthConfig } from 'next-auth';
import NextAuth from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { user } from '@/mock';
// import prisma from '@/lib/prisma';

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    role: "MEMBER" | "MANAGER" | "ADMIN";
    teamId?: string;
    managerId?: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      status: "ACTIVE" | "INACTIVE";
      role: "MEMBER" | "MANAGER" | "ADMIN";
      teamId?: string;
      managerId?: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    role: "MEMBER" | "MANAGER" | "ADMIN";
    teamId?: string;
    managerId?: string;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null
          }

          // Fetch user from database
          // const user = await prisma.user.findUnique({
          //   where: { username: credentials.username },
          // });

          // if (!user) {
          //   return null;
          // }

          if (credentials.username !== user.username) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role as "ADMIN" | "MANAGER" | "MEMBER",
            status: user.status as "ACTIVE" | "INACTIVE",
            teamId: user.teamId,
            managerId: user.managerId,
          };
        } catch (error: any) { // eslint-disable-line
          console.error('Error during authorization:', error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 5 * 60, // 5 minutes
    // maxAge: 24 * 60 * 60, // 1 days
  },

  jwt: {
    maxAge: 5 * 60, // 5 minutes
    // maxAge: 24 * 60 * 60, // 1 days
  },

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role;
          token.status = user.status;
          token.id = user.id;
          token.username = user.username;
        }
        return token;

      } catch (error) {
        console.error('Error in JWT callback:', error);
        throw new Error("Token processing error");
      }
    },

    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.name = token.name as string;
          session.user.role = token.role as "MEMBER" | "MANAGER" | "ADMIN";
          session.user.status = token.status as "ACTIVE" | "INACTIVE";
          session.user.username = token.username as string;
          session.user.teamId = token.teamId as string;
          session.user.managerId = token.managerId as string;
        }
        return session
      } catch (error) {
        console.error('Error in session callback:', error);
        throw new Error("Session processing error");
      }
    },

    async signIn({ user }) {
      // Block inactive users
      if (user.status === "INACTIVE") {
        throw new Error("Account is inactive. Contact administrator.");
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "production",
} satisfies NextAuthConfig);
