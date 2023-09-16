export const getTasksSubTask = async (taskId: number) => {
  return prisma.subTask.findMany({
    where: {
      task_id: taskId,
    },
  });
};
