import { NextResponse } from "next/server";
import { AddColumnDto } from "./route";
import { StatusCodes } from "http-status-codes";

import prisma from "@/lib/prisma";

export const addNewColumn = async (addColumnDto: AddColumnDto) => {
  const addColumnResult = await prisma.column.createMany({
    data: addColumnDto.columns.map((column) => {
      return {
        title: column,
        board_id: Number(addColumnDto.boardId),
      };
    }),
  });

  if (!addColumnResult) {
    return NextResponse.json(
      {
        message: "column을 추가하는데 실패했습니다. 다시 시도해 주세요.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  return NextResponse.json(
    { message: "column이 추가되었습니다." },
    {
      status: StatusCodes.CREATED,
    }
  );
};
