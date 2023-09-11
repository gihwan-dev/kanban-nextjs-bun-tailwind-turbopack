import { Params } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { deleteTask, getTasks, updateTaskState } from "./handler";
import { StatusCodes } from "http-status-codes";

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const data = (await req.json()) as { columnId: number };
  return updateTaskState(Number(params.id), data.columnId);
};

export const GET = async (req: NextRequest, { params }: Params) => {
  return getTasks(Number(params.id));
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    return await deleteTask(Number(params.id));
  } catch (error) {
    return NextResponse.json(
      {},
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
};
