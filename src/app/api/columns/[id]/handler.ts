import { deleteColumn } from "@/services/prisma-column-service";
import { NextResponse } from "next/server";

export const deleteColumnHandler = async (id: number) => {
  const deleteResult = await deleteColumn(id);

  if (!deleteResult) {
    return NextResponse.json({ message: "fail to delete" });
  }

  return NextResponse.json({ message: "success" });
};
