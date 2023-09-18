import React from "react";
import { RootColumn } from "@/types/prisma-type";
import randomColor from "randomcolor";
import ColumnContainerHeader from "./ColumnContainerHeader";
import TaskItem from "./TaskItem";
import { useGetColumnsTask, useGetColumnsTaskCount } from "../hooks";

const ColumnContainer: React.FC<{
  column: RootColumn;
}> = ({ column }) => {
  const { data: tasksCount } = useGetColumnsTaskCount(column.column_id);
  const color = randomColor();
  const { data: tasks } = useGetColumnsTask(column.column_id);

  return (
    <ul className={"flex flex-col h-full gap-4"}>
      <ColumnContainerHeader
        color={color}
        title={column.title}
        count={tasksCount ?? 0}
      />
      <div
        className={"flex flex-col w-72 gap-5 overflow-y-auto p-2 box-border"}
      >
        {tasks?.map(item => {
          return (
            <TaskItem
              key={`${item.task_id} ${column.column_id} TaskItem`}
              task={item}
            />
          );
        })}
      </div>
    </ul>
  );
};

export default ColumnContainer;
