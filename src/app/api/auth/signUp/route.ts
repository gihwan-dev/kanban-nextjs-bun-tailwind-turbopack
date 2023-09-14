import { NextResponse } from "next/server";
import { createOne } from "./handler";
import { StatusCodes } from "http-status-codes";
import { SignupDto } from "@/features/auth";

export const POST = async (req: Request) => {
  try {
    const signUpDto = (await req.json()) as SignupDto;
    return createOne(signUpDto);
  } catch (error) {
    return NextResponse.json("Unknown error", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
