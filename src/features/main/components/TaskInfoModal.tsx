import { createPortal } from "react-dom";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { SubTask } from "@prisma/client";
import TaskInfoModalHeader from "./TaskInfoModalHeader";
import TaskInfoModalSubtasks from "./TaskInfoModalSubtasks";
import { useGetSubtasks } from "../hooks";
import TaskInfoModalFooter from "@/features/main/components/TaskInfoModalFooter";

const TaskInfoModal: React.FC<{
  onClose: () => void;
  subTasks?: SubTask[];
  title: string;
  description: string;
  taskId: number;
  columnId: number;
}> = ({ onClose, subTasks, title, description, taskId, columnId }) => {
  const [mounted, setMounted] = useState(false);
  const { refetch } = useGetSubtasks(taskId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCloseHandler = async () => {
    onClose();
    refetch();
  };

  return mounted
    ? createPortal(
        <Modal onBackdropClick={onCloseHandler}>
          <div
            className={
              "absolute w-72 -bg--White top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 pt-6 pb-8 flex flex-col gap-6 rounded-md"
            }
          >
            <TaskInfoModalHeader title={title} />
            <p className={"-text--Medium-Grey font-medium text-sm"}>
              {description}
            </p>
            <TaskInfoModalSubtasks taskId={taskId} subTasks={subTasks} />
            <TaskInfoModalFooter />
          </div>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default TaskInfoModal;
