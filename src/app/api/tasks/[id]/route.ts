import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types/params";
import {
  deleteTaskHandler,
  getColumnsTaskHandler,
  setTasksColumnHandler,
} from "./handler";
import { StatusCodes } from "http-status-codes";

export const POST = async (req: NextRequest, { params }: Params) => {
  try {
    const targetColumnId = (await req.json()) as number;
    const taskId = Number(params.id);
    return await setTasksColumnHandler(taskId, targetColumnId);
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return getColumnsTaskHandler(Number(params.id));
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    return deleteTaskHandler(Number(params.id));
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
