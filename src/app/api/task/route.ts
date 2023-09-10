import { NextRequest, NextResponse } from "next/server";
import { addNewTask } from "./handler";
import { AddNewTaskDto } from "@/components/nav/AddNewTaskModal";
import { StatusCodes } from "http-status-codes";

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as AddNewTaskDto;
    return await addNewTask(data);
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
