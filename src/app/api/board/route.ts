import { CreateBoardFormData } from "@/components/nav/CreateNewModal";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createBoard, getBoard } from "./handler";
import { StatusCodes } from "http-status-codes";
import { Board, Column } from "@prisma/client";
import { useSession } from "next-auth/react";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      return NextResponse.json(
        {
          message: "권한이 없습니다. 로그인 후 다시 시도해 주세요.",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        }
      );
    }

    const body = (await req.json()) as CreateBoardFormData;

    return await createBoard(body, session.user.email);
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

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession();

    if (!session || !session?.user?.email) {
      return NextResponse.json(
        {
          message: "권한이 없습니다. 로그인 후 다시 시도해 주세요.",
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        }
      );
    }
    return await getBoard(session.user.email);
  } catch (error) {
    return NextResponse.json(
      { message: "알 수 없는 오류로 실패했습니다. 다시 시도해 주세요." },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export interface GetBoardResponse extends Pick<Board, "title" | "board_id"> {
  columns: Pick<Column, "column_id" | "title">[];
}
