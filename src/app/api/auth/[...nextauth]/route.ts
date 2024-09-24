import NextAuth from "next-auth";

import { authenticate } from "@/app/api/auth/[...nextauth]/handler";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { option } from "@/app/api/auth/[...nextauth]/options";

const handler = NextAuth(option);

export { handler as GET, handler as POST };
