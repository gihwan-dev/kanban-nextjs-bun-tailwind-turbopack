import { NextRequest, NextResponse } from "next/server";
import { getColumns } from "./handler";
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
      }
    );
  }
};
