import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const getTask = async (columnId: number) => {
  const task = await prisma.task.findMany({
    where: {
      column_id: columnId,
    },
    select: {
      task_id: true,
      title: true,
    },
  });

  const dataPromise = task.map(async task => {
    const total = await prisma.subTask.count({
      where: {
        task_id: task.task_id,
      },
    });
    const done = await prisma.subTask.count({
      where: {
        task_id: task.task_id,
        AND: {
          state: true,
        },
      },
    });
    return {
      ...task,
      total,
      done,
    };
  });
  const data = await Promise.all(dataPromise);

  return NextResponse.json(data, {
    status: StatusCodes.OK,
  });
};

export const deleteColumn = async (columnId: number) => {
  const deleteColumn = await prisma.column.delete({
    where: {
      column_id: columnId,
    },
  });

  if (!deleteColumn) {
    return NextResponse.json(
      {
        message: "칼럼 삭제에 실패했습니다.",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }

  return NextResponse.json(
    {
      message: "칼럼 삭제에 성공했습니다.",
    },
    {
      status: StatusCodes.OK,
    },
  );
};
