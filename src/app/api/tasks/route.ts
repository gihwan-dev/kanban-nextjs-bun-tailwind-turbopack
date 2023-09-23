import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { createNewTask } from "./handler";
import { CreateNewTaskDto } from "@/types/task-type";

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as CreateNewTaskDto;
    return createNewTask(data);
  } catch (error) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
