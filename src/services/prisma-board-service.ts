import prisma from "@/lib/prisma";

export const getNavBoardService = async () => {
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
