import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const updateSubTask = async (subTaskId: number, state: boolean) => {
  const updateResult = await prisma.subTask.update({
    where: {
      subtask_id: subTaskId,
    },
    data: {
      state,
    },
  });

  if (!updateResult) {
    return NextResponse.json(
      {
        message: "알 수 없는 오류로 실패했습니다. 다시 시도해 주세요.",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }

  return NextResponse.json(
    {},
    {
      status: StatusCodes.OK,
    }
  );
};
