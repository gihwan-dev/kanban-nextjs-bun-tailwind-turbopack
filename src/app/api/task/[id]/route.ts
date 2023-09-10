import { Params } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getTasks, updateTaskState } from "./handler";

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const data = (await req.json()) as { columnId: number };
  return updateTaskState(Number(params.id), data.columnId);
};

export const GET = async (req: NextRequest, { params }: Params) => {
  return getTasks(Number(params.id));
};
