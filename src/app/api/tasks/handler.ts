import { NextResponse } from "next/server";
import { CreateNewTaskDto } from "@/types/task-type";
import { StatusCodes } from "http-status-codes";
import { createTask } from "@/services/prisma-task-service";

export const createNewTask = async (data: CreateNewTaskDto) => {
  const result = await createTask(data);
  if (!result) {
    throw new Error();
  }
  return NextResponse.json({}, { status: StatusCodes.OK });
};
