import { Params } from "@/types";
import { get } from "http";
import { NextRequest } from "next/server";
import { getTask } from "./handler";

export const GET = async (req: NextRequest, { params }: Params) => {
  return getTask(Number(params.id));
};
