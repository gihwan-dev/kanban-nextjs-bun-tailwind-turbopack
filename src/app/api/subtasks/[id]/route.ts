import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types/params";
import { getSubtasks } from "@/app/api/subtasks/[id]/handler";
import { StatusCodes } from "http-status-codes";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return await getSubtasks(Number(params.id));
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
