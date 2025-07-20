import type { NextAuthConfig } from 'next-auth';
import NextAuth from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { user } from '@/mock';
// import prisma from '@/lib/prisma'; 
// import Credentials from 'next-auth/providers/credentials';

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        name: string;
        role: string;
        status: string;
        teamId?: string;
        teamAlias?: string;
        managerId?: string;
        isManager?: boolean;
        isAdmin?: boolean;
        permissions?: string[];
    }

    interface Session {
        user: {
            id: string;
            username: string;
            name: string;
            role: string;
            status: string;
            teamId?: string;
            teamAlias?: string;
            managerId?: string;
            isManager?: boolean;
            permissions?: string[];
        };
    }

    interface JWT {
        id: string;
        name?: string;
        email?: string;
        role?: string;
        status?: string;
        username?: string;
        teamId?: string;
        teamAlias?: string;
        managerId?: string;
        isManager?: boolean;
        permissions?: string[];
    }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                // const [member, manager, admin] = await Promise.all([
                //     prisma.member.findUnique({ where: { username: credentials.username } }),
                //     prisma.manager.findUnique({ where: { username: credentials.username } }),
                //     prisma.admin.findUnique({ where: { username: credentials.username } }),
                // ]);

                // const user = member || manager || admin;

                // if (!user) {
                //     throw new Error('User not found');
                // }

                if (credentials.username !== user.username) {
                    throw new Error('User not found.');
                }

                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

                if (!isPasswordValid) {
                    throw new Error('Username or password is incorrect.');
                }

                return {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                };
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
        authorized({ auth, request: { nextUrl } }) {

            console.log("Auth:", auth);

            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.status = user.status;
                token.id = user.id;
                token.username = user.username;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;
                session.user.status = token.status as string;
                session.user.username = token.username as string;
            }
            return session;
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
    }
} satisfies NextAuthConfig);
