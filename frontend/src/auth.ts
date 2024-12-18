import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import client from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ account, user }) {
      if (account?.access_token && user?.id) {
        const db = (await client).db();
        await db
          .collection("accounts")
          .updateOne(
            { userId: user.id, provider: account.provider },
            { $set: { access_token: account.access_token } },
            { upsert: true }
          );
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;

        if (user?.id && account.access_token) {
          const db = (await client).db();
          await db
            .collection("accounts")
            .updateOne(
              { userId: user.id, provider: account.provider },
              { $set: { access_token: account.access_token } },
              { upsert: true }
            );
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
  logger: {
    error(code, ...message) {
      console.log(code, message);
    },
    warn(code, ...message) {
      console.log(code, message);
    },
    debug(code, ...message) {
      console.log(code, message);
    },
  },
  ...authConfig,
});