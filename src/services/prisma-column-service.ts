import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { RootColumn } from "@/types/prisma-type";

export const getColumnService = async (
  session: Session | null,
  boardId: number,
): Promise<RootColumn[]> => {
  if (!session) {
    return [];
  }
  return prisma.column.findMany({
    where: {
      board: {
        board_id: boardId,
      },
    },
    select: {
      column_id: true,
      title: true,
      board_id: true,
    },
  });
};

export const getColumnTaskCount = async (columnId: number) => {
  return prisma.task.count({
    where: {
      column_id: columnId,
    },
  });
};
