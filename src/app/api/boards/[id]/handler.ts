import { getColumnService } from "@/services/prisma-column-service";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export const getColumnsHandler = async (boardId: number) => {
  const columns = await getColumnService(boardId);

  return NextResponse.json(columns, { status: StatusCodes.OK });
};
