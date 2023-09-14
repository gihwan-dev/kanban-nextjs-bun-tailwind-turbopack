import { comparePassword } from "@/utils/hash";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "",
        },
      },
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValidPassword = await comparePassword(
          credentials.password,
          user?.password,
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        return {
          email: user.email,
          id: user.id.toString(),
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
