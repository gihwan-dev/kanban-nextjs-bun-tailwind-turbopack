import nextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticate } from "./handler";

const option: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      authorize: async (credentials, req) => {
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
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = nextAuth(option);

export { handler as GET, handler as POST };
