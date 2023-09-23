import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useGetColumns, useSetTasksColumn } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "@prisma/client";
import { useParams } from "next/navigation";

const TaskInfoModalFooter: React.FC<{
  columnId: number;
  taskId: number;
}> = ({ columnId, taskId }) => {
  const params = useParams();
  const { data: columns } = useGetColumns(Number(params.id));
  const { mutate } = useSetTasksColumn();

  const queryClient = useQueryClient();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetColumnId = Number(e.target.value);
    let targetTask: Task;
    mutate({ taskId, targetColumnId });

    queryClient.setQueryData(["columns", "tasks", columnId], old => {
      const updateData = [...(old as Task[])];
      return updateData.filter(item => {
        if (item.task_id === taskId) {
          targetTask = item;
        }
        return item.task_id !== taskId;
      });
    });
    queryClient.setQueryData(["columns", "tasks", targetColumnId], old => {
      const updateData = [...(old as Task[])];
      return [...updateData, targetTask];
    });
  };

  if (!columns) {
    return null;
  }

  return (
    <footer className={"flex flex-col gap-2"}>
      <h3 className={"text-sm font-bold -text--Medium-Grey"}>Current Status</h3>
      <Select
        aria-label={"select column menu"}
        onChange={onChangeHandler}
        variant={"bordered"}
        defaultSelectedKeys={`${columnId}`}
        labelPlacement={"outside-left"}
        radius={"sm"}
        size={"md"}
      >
        {columns.map(item => {
          return (
            <SelectItem value={item.column_id} key={`${item.column_id}`}>
              {item.title}
            </SelectItem>
          );
        })}
      </Select>
    </footer>
  );
};

export default TaskInfoModalFooter;
