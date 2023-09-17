import React from "react";
import { SubTask } from "@prisma/client";
import CheckBoxIcon from "@/assets/CheckBoxIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useSetSubtasks } from "../hooks";

const TaskInfoModalSubtasks: React.FC<{
  subTasks?: SubTask[];
  taskId: number;
}> = ({ subTasks, taskId }) => {
  const { mutate } = useSetSubtasks();

  const total = subTasks?.length;

  const done = subTasks?.reduce((acc, item) => {
    if (item.state) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const queryClient = useQueryClient();

  const onClickHandler = (subTaskId: number) => {
    let updateSubTaskState = false;
    queryClient.setQueryData(["subtasks", taskId], () => {
      return subTasks?.map(item => {
        if (item.subtask_id === subTaskId) {
          const newItem = { ...item };
          updateSubTaskState = !newItem.state;
          newItem.state = !newItem.state;
          return newItem;
        }
        return item;
      });
    });
    mutate({ subTaskId, state: updateSubTaskState });
  };

  return (
    <form className={"flex flex-col gap-4 w-full"}>
      <header className={"font-bold -text--Medium-Grey text-xs"}>
        Subtasks ({done} of {total})
      </header>
      <div className={"flex flex-col gap-2"}>
        {subTasks?.map(item => {
          return (
            <div
              onClick={onClickHandler.bind(null, item.subtask_id)}
              className={
                "flex flex-row items-center gap-4 p-3 -bg--light-grey-light-bg rounded-md cursor-pointer"
              }
              key={`${item.createdAt} ${item.subtask_id} SubTask`}
            >
              <CheckBoxIcon state={item.state} />
              <label>{item.title}</label>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default TaskInfoModalSubtasks;
