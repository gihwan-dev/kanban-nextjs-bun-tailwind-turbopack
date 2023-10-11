import prisma from "@/lib/prisma";
import { RootColumn } from "@/types/prisma-type";

export const getColumnService = async (
  boardId: number,
): Promise<RootColumn[]> => {
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

export const deleteColumn = async (id: number) => {
  return prisma.column.delete({
    where: {
      column_id: id,
    },
  });
};
