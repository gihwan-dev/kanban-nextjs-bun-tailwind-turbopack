import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { CreateBoardDto } from "@/features/main";
import { getServerSession } from "next-auth";
import {
  createNewBoard,
  getBoardsService,
} from "@/services/prisma-board-service";

export const createNewBoardHandler = async (
  req: NextRequest,
  data: CreateBoardDto,
) => {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  const result = createNewBoard(data, session.user.email);
  if (!result) {
    throw new Error();
  }

  return NextResponse.json({}, { status: StatusCodes.OK });
};

export const getBoardHandler = async (req: NextRequest) => {
  const session = await getServerSession();
  if (!session || !session?.user?.email) {
    return NextResponse.redirect(new URL("signIn", req.url));
  }
  const boards = await getBoardsService(session.user.email);

  return NextResponse.json(boards, { status: StatusCodes.OK });
};
