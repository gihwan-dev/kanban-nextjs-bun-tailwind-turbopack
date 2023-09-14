import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export const validateUser = (
  session: Session | null,
): session is Session & { user: { email: string } } => {
  if (!session) {
    return false;
  }
  return !!session.user?.email;
};

export const getNavBoardService = async (session: Session | null) => {
  if (!validateUser(session)) {
    return [];
  }
  return prisma.board.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      board_id: true,
      title: true,
    },
  });
};
