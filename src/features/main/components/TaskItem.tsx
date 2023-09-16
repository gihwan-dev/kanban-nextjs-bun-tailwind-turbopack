import React from "react";
import { Task } from "@prisma/client";
import { getTasksSubTask } from "@/services/prisma-subtask-service";

const TaskItem: React.FC<{
  task: Task;
}> = async ({ task }) => {
  const subTasks = await getTasksSubTask(task.task_id);

  const total = subTasks.length;

  const done = subTasks.reduce((acc, item) => {
    if (item.state) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <li
      className={
        "flex flex-col px-4 py-6 rounded-lg w-full -bg--White shadow-task-card gap-2"
      }
    >
      <header className={"text-base font-bold -text--Black"}>
        {task.title}
      </header>
      <p className={"text-xs font-bold -text--Medium-Grey"}>
        {done} of {total} subtasks
      </p>
    </li>
  );
};

export default TaskItem;
