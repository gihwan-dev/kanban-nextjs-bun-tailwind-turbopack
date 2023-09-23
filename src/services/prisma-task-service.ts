import prisma from "@/lib/prisma";
import { CreateNewTaskDto } from "@/types/task-type";
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

export const createTask = async (data: CreateNewTaskDto) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      column_id: data.status,
      subTasks: {
        create: data.subtasks.map(item => {
          return {
            title: item,
          };
        }),
      },
    },
  });
};
