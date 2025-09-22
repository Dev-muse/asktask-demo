import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    graphqlToken?: string;
  }

  interface User {
    graphqlToken?: string; // added to User for authorize()
  }

  interface JWT extends DefaultJWT {
    graphqlToken?: string;
  }
}
