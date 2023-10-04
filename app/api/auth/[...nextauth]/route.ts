import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
  pages: {
    signIn: "auth/signin",
    error: "auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user: any = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        const isMatchPassword = bcrypt.compareSync(
          String(credentials?.password),
          String(user?.password)
        );

        if (user && isMatchPassword) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/book`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
