import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
      accessToken?: accessToken;
      picture: string;
      profile: {
        login: string;
        created_at: string;
        updated_at: string;
        bio: string;
      }
    } & DefaultSession["user"];
  }
}