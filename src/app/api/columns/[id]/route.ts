import { Params } from "@/types/params";
import { NextRequest, NextResponse } from "next/server";
import { deleteColumnHandler } from "./handler";

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    return deleteColumnHandler(Number(params.id));
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
};
