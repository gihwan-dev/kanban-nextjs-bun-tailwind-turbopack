import { getColumnService } from "@/services/prisma-column-service";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import {
  addNewColumns,
  deleteBoard,
  updateBoard,
} from "@/services/prisma-board-service";
import { UpdateBoardDto } from "./type";

export const getColumnsHandler = async (boardId: number) => {
  const columns = await getColumnService(boardId);

  return NextResponse.json(columns, { status: StatusCodes.OK });
};

export const addColumnsHandler = async (boardId: number, data: string[]) => {
  const result = await addNewColumns(boardId, data);

  if (!result) {
    return NextResponse.error().json();
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
};

export const updateBoardHandler = async (
  boardId: number,
  form: UpdateBoardDto,
) => {
  const result = await updateBoard(boardId, form);

  if (!result) {
    return NextResponse.json({}, { status: StatusCodes.NOT_FOUND });
  }
  return NextResponse.json({}, { status: StatusCodes.OK });
};

export const deleteBoardHandler = async (boardId: number) => {
  const result = await deleteBoard(boardId);

  if (!result) {
    return NextResponse.json({}, { status: StatusCodes.NOT_FOUND });
  }
  return NextResponse.json({}, { status: StatusCodes.OK });
};
