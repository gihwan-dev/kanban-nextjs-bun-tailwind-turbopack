import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "@/utils/hash";
import { SignUpDto } from "@/features/signUp";

export const createOne = async (signUpDto: SignUpDto) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: signUpDto.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message: "User already exists",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      },
    );
  }

  const hashedPassword = await hashPassword(signUpDto.password);

  const createResult = await prisma.user.create({
    data: {
      email: signUpDto.email,
      password: hashedPassword,
    },
  });
  if (!createResult) {
    return NextResponse.json(
      {
        message: "Failed to create user",
      },
      {
        status: StatusCodes.FORBIDDEN,
      },
    );
  }
  return NextResponse.json(
    {
      message: "User created",
    },
    {
      status: StatusCodes.CREATED,
    },
  );
};
