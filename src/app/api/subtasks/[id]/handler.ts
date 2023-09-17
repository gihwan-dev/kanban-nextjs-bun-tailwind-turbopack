import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getTasksSubTask } from "@/services/prisma-subtask-service";

export const getSubtasks = async (taskId: number) => {
  const subtasks = await getTasksSubTask(taskId);

  return NextResponse.json(subtasks, { status: StatusCodes.OK });
};
