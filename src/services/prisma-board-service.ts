import prisma from "@/lib/prisma";
import { validateUser } from "@/utils/auth";
import { Session } from "next-auth";

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
