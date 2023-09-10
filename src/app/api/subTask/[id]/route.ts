import { Params } from "@/types";
import { NextRequest } from "next/server";
import { updateSubTask } from "./handler";

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const data = (await req.json()) as { state: boolean };
  return updateSubTask(Number(params.id), data.state);
};
