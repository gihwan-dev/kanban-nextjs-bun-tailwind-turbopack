"use client";

import React, { useEffect, useState } from "react";
import TaskModal, { getTaskAxios } from "./TaskModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/utils/hooks/redux-hooks";

const BodyColumnItem: React.FC<{
  taskId: number;
  title: string;
  total: number;
  done: number;
}> = ({ taskId, title, total, done }) => {
  const [openModal, setOpenModal] = useState(false);

  const boardId = useAppSelector((state) => state.nav.id);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(["task", taskId], () => getTaskAxios(taskId));
  }, []);

  const closeModalHandler = async () => {
    setOpenModal(false);
    queryClient.invalidateQueries(["tasks"]);
  };

  return (
    <React.Fragment>
      <div
        onClick={() => setOpenModal(true)}
        className="flex flex-col gap-2 px-4 py-6 -bg--White shadow-task-card box-border hover:scale-105 rounded-lg cursor-pointer"
      >
        <h3 className="text-base font-bold -text--Black">{title}</h3>
        <p className="text-xs font-bold -text--Medium-Grey">
          {done} of {total} subtasks
        </p>
      </div>
      {openModal && (
        <TaskModal
          taskId={taskId}
          onClose={closeModalHandler}
        />
      )}
    </React.Fragment>
  );
};

export default BodyColumnItem;
