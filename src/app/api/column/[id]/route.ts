import { Params } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { deleteColumn, getTask } from "./handler";
import { StatusCodes } from "http-status-codes";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return getTask(Number(params.id));
  } catch (e) {
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
  try {
    return deleteColumn(Number(params.id));
  } catch (e) {
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
