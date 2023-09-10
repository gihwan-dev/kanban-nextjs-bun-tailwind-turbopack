import { CreateBoardFormData } from "@/components/nav/CreateNewModal";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const createBoard = async (
  createBoardDto: CreateBoardFormData,
  email: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "유저를 찾을 수 없습니다.",
      },
      {
        status: StatusCodes.NOT_FOUND,
      }
    );
  }

  const createBoard = await prisma.board.create({
    data: {
      title: createBoardDto.boardName,
      user: {
        connect: { email: user.email },
      },
    },
    select: {
      board_id: true,
    },
  });

  const createColumn = await prisma.column.createMany({
    data: createBoardDto.columns.map((column) => {
      return {
        title: column,
        board_id: createBoard.board_id,
      };
    }),
  });

  if (!createBoard) {
    return NextResponse.json(
      {
        message: "보드 생성에 실패했습니다.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  if (!createColumn) {
    return NextResponse.json(
      {
        message: "column 추가에 실패했습니다.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  return NextResponse.json(
    {
      message: "보드 생성에 성공했습니다.",
    },
    {
      status: StatusCodes.CREATED,
    }
  );
};
