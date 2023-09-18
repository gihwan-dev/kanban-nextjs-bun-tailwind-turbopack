import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";

export const getColumnsTask = async (columnId: number): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      column_id: columnId,
    },
  });
};

export const setTasksColumn = async (
  taskId: number,
  targetColumnId: number,
) => {
  return prisma.task.update({
    where: {
      task_id: taskId,
    },
    data: {
      column_id: targetColumnId,
    },
  });
};

export const deleteTask = async (taskId: number) => {
  return prisma.task.delete({
    where: {
      task_id: taskId,
    },
  });
};
