import prisma from "@/lib/prisma";

export const getTasksSubTask = async (taskId: number) => {
  return prisma.subTask.findMany({
    where: {
      task_id: taskId,
    },
  });
};

export const setSubTasksState = async (subTaskId: number, state: boolean) => {
  return prisma.subTask.update({
    where: {
      subtask_id: subTaskId,
    },
    data: {
      state,
    },
  });
};
