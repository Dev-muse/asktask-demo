// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, DefaultSession, JWT } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "@/lib/queries";
import { gqlFetch } from "@/lib/graphql";

// Extend NextAuth types
declare module "next-auth" {
  interface Session extends DefaultSession {
    graphqlToken?: string;
  }
  interface JWT {
    graphqlToken?: string;
  }
  interface User {
    graphqlToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: "openid email profile" } },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const data = await gqlFetch<{
            login: { token: string; user: { id: string; email: string; name?: string } };
          }>(LOGIN, {
            input: { email: credentials.email, password: credentials.password },
          });

          if (data.login?.token) {
            return {
              id: data.login.user.id,
              email: data.login.user.email,
              name: data.login.user.name,
              graphqlToken: data.login.token,
            };
          }
          return null;
        } catch (err) {
          console.error("Credentials login error:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account }) {
      // Credentials login: token already attached
      if (user?.graphqlToken) token.graphqlToken = user.graphqlToken;

      // Google login
      if (account?.provider === "google" && user?.email) {
        try {
          const googleToken = account.access_token;
          const data = await gqlFetch<{ googleLogin: { token: string } }>(
            `mutation googleLogin($token: String!) { googleLogin(token: $token) { token } }`,
            { token: googleToken }
          );
          token.graphqlToken = data.googleLogin.token;
        } catch (err) {
          console.error("GraphQL Google login failed:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.graphqlToken) session.graphqlToken = token.graphqlToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
