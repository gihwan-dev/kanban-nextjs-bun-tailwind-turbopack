import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { CreateBoardDto } from "@/features/main";
import { getServerSession } from "next-auth";
import {
  createNewBoard,
  getBoardsService,
} from "@/services/prisma-board-service";

export const createNewBoardHandler = async (data: CreateBoardDto) => {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return NextResponse.redirect("/auth");
  }

  const result = createNewBoard(data, session.user.email);
  if (!result) {
    throw new Error();
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
};

export const getBoardHandler = async () => {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return NextResponse.redirect("/auth");
  }
  const boards = await getBoardsService(session.user.email);

  return NextResponse.json(boards, { status: StatusCodes.OK });
};
