import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authHandler = NextAuth({
  adapter: {
    ...PrismaAdapter(prisma),
    linkAccount: async ({ ok, state, ...data }: any) => {
      data.expires_in = data.refresh_token_expires_in || 0;
      if (data.refresh_token_expires_in) {
        delete data.refresh_token_expires_in;
      }

      prisma.account.create({ data });
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, account, profile }) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
        token.profile = profile;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-ignore
      session.user = token;
      return session;
    },
  },
});

export { authHandler as GET, authHandler as POST };
