"use client";

import React, { useState } from "react";
import { Task } from "@prisma/client";
import { useGetSubtasks } from "../hooks";
import TaskInfoModal from "./TaskInfoModal";

const TaskItem: React.FC<{
  task: Task;
}> = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);

  const { data: subTasks } = useGetSubtasks(task.task_id);
  const total = subTasks?.length;

  const done = subTasks?.reduce((acc, item) => {
    if (item.state) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const onTaskClickHandler = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <li
        onClick={onTaskClickHandler}
        className={
          "flex flex-col px-4 py-6 rounded-lg w-full -bg--White shadow-task-card gap-2 relative cursor-pointer"
        }
      >
        <header className={"text-base font-bold -text--Black"}>
          {task.title}
        </header>
        <p className={"text-xs font-bold -text--Medium-Grey"}>
          {done} of {total} subtasks
        </p>
      </li>
      {openModal && (
        <TaskInfoModal
          title={task.title}
          description={task.description}
          subTasks={subTasks}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};

export default TaskItem;
