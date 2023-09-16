import React from "react";
import { RootColumn } from "@/types/prisma-type";
import { getColumnTaskCount } from "@/services/prisma-column-service";
import randomColor from "randomcolor";
import ColumnContainerHeader from "./ColumnContainerHeader";
import { getColumnsTask } from "@/services/prisma-task.service";
import TaskItem from "./TaskItem";

const ColumnContainer: React.FC<{
  column: RootColumn;
}> = async ({ column }) => {
  const tasksCount = await getColumnTaskCount(column.column_id);
  const color = randomColor();
  const tasks = await getColumnsTask(column.column_id);
  return (
    <ul className={"flex flex-col h-full gap-4"}>
      <ColumnContainerHeader
        color={color}
        title={column.title}
        count={tasksCount}
      />
      <div
        className={"flex flex-col w-72 gap-5 overflow-y-auto p-2 box-border"}
      >
        {tasks.map(item => {
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
