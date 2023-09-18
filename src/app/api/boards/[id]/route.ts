import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types/params";
import { StatusCodes } from "http-status-codes";
import { getColumnsHandler } from "@/app/api/boards/[id]/handler";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return getColumnsHandler(Number(params.id));
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
