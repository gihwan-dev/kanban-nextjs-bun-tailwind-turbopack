import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types/params";
import { StatusCodes } from "http-status-codes";
import {
  addColumnsHandler,
  getColumnsHandler,
  updateBoardHandler,
} from "@/app/api/boards/[id]/handler";
import { UpdateBoardDto } from "./type";

export const GET = async (req: NextRequest, { params }: Params) => {
  try {
    return getColumnsHandler(Number(params.id));
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export const POST = async (req: NextRequest, { params }: Params) => {
  try {
    const data = (await req.json()) as string[];
    return addColumnsHandler(Number(params.id), data);
  } catch (e) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  try {
    const id = Number(params.id);
    const form = (await req.json()) as UpdateBoardDto;
    return updateBoardHandler(id, form);
  } catch (error) {
    return NextResponse.json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
