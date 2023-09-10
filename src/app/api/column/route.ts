import { NextRequest, NextResponse } from "next/server";
import { addNewColumn } from "./handler";
import { StatusCodes } from "http-status-codes";

export type AddColumnDto = {
  boardId: number;
  columns: string[];
};

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as AddColumnDto;

    return await addNewColumn(data);
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
