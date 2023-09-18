import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types/params";
import { StatusCodes } from "http-status-codes";
import { getColumnsTaskCountHandler } from "@/app/api/columns/[id]/count/handler";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return await getColumnsTaskCountHandler(Number(params.id));
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
