import NextAuth from "next-auth";

import { authenticate } from "@/app/api/auth/[...nextauth]/handler";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const option: AuthOptions = {
  pages: {
    signIn: "/signIn",
    signOut: "/signIn",
    newUser: "/signUp",
    error: "/signIn",
  },
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith("https"),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          if (typeof credentials !== "undefined") {
            const res = await authenticate(
              credentials.email,
              credentials.password,
            );
            if (!res) {
              return null;
            }
            return {
              email: res.email,
              id: res.email,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(option);

export { handler as GET, handler as POST };
