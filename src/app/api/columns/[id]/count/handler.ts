import { getColumnTaskCount } from "@/services/prisma-column-service";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export const getColumnsTaskCountHandler = async (columnId: number) => {
  const count = await getColumnTaskCount(columnId);

  return NextResponse.json(count, { status: StatusCodes.OK });
};
