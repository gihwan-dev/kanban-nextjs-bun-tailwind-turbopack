import { comparePassword } from "@/utils/hash";
import prisma from "@/lib/prisma";

type AuthHandlerResponse = {
  email: string;
  password: string;
};

export const authenticate = async (
  email: string,
  password: string,
): Promise<AuthHandlerResponse | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
    },
  });
  if (!user) {
    return null;
  }
  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return null;
  }
  return user;
};
