import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const getColumns = async (boardId: number) => {
  const columns = await prisma.column.findMany({
    where: {
      board_id: boardId,
    },
    select: {
      column_id: true,
      title: true,
    },
  });

  if (!columns) {
    return NextResponse.json(
      {
        message: "column을 찾는데 실패했습니다. 다시 시도해 주세요.",
      },
      {
        status: StatusCodes.NOT_FOUND,
      },
    );
  }

  return NextResponse.json(columns, {
    status: StatusCodes.OK,
  });
};

export const deleteBoards = async (boardId: number) => {
  const deleteResult = await prisma.board.delete({
    where: {
      board_id: boardId,
    },
  });

  return NextResponse.json(
    {},
    {
      status: StatusCodes.OK,
    },
  );
};
