import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import {
  getTasksSubTask,
  setSubTasksState,
} from "@/services/prisma-subtask-service";

export const getSubtasks = async (taskId: number) => {
  const subtasks = await getTasksSubTask(taskId);

  return NextResponse.json(subtasks, { status: StatusCodes.OK });
};

export const setSubtasksState = async (subTaskId: number, state: boolean) => {
  const result = await setSubTasksState(subTaskId, state);
  if (!result) {
    return NextResponse.json({}, { status: StatusCodes.NOT_FOUND });
  }
  return NextResponse.json({}, { status: StatusCodes.OK });
};
