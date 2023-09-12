import { NextRequest, NextResponse } from "next/server";
import { deleteBoards, getColumns } from "./handler";
import { StatusCodes } from "http-status-codes";
import { Params } from "@/types";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return await getColumns(Number(params.id));
  } catch (error) {
    return NextResponse.json(
      {
        message: "알 수 없는 오류로 실패했습니다. 다시 시도해 주세요.",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  return await deleteBoards(Number(params.id));
};
