import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import {
  createNewBoardHandler,
  getBoardHandler,
} from "@/app/api/boards/handler";
import { CreateBoardDto } from "@/features/main";

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as CreateBoardDto;
    return createNewBoardHandler(data);
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export const GET = async () => {
  try {
    return getBoardHandler();
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
