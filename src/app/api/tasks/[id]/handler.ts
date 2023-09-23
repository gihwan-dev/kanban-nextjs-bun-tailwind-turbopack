import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import {
  deleteTask,
  getColumnsTask,
  setTasksColumn,
} from "@/services/prisma-task-service";

export const setTasksColumnHandler = async (
  taskId: number,
  targetColumnId: number,
) => {
  const updateResult = setTasksColumn(taskId, targetColumnId);
  if (!updateResult) {
    return NextResponse.json(
      {
        message:
          "해당 태스크를 찾는데 실패했습니다. 새로고침 후 다시시도해 주세요.",
      },
      { status: StatusCodes.NOT_FOUND },
    );
  }
  return NextResponse.json({}, { status: StatusCodes.OK });
};

export const getColumnsTaskHandler = async (columnId: number) => {
  const tasks = await getColumnsTask(columnId);

  return NextResponse.json(tasks, { status: StatusCodes.OK });
};

export const deleteTaskHandler = async (taskId: number) => {
  const deleteResult = await deleteTask(taskId);

  return NextResponse.json({}, { status: StatusCodes.OK });
};
