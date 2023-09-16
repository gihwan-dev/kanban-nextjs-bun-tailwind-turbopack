import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";

export const getColumnsTask = async (columnId: number): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      column_id: columnId,
    },
  });
};
