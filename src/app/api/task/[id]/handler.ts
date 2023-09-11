import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const getTasks = async (taskId: number) => {
  const task = await prisma.task.findUnique({
    where: {
      task_id: taskId,
    },
    select: {
      task_id: true,
      title: true,
      description: true,
      column_id: true,
      subTasks: {
        select: {
          subtask_id: true,
          title: true,
          state: true,
        },
      },
    },
  });
  if (!task) {
    return NextResponse.json(
      {
        message: "task를 찾을 수 없습니다.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }
  return NextResponse.json(task, {
    status: StatusCodes.OK,
  });
};

export const updateTaskState = async (taskId: number, columnId: number) => {
  const updateResult = await prisma.task.update({
    where: {
      task_id: taskId,
    },
    data: {
      column_id: columnId,
    },
  });

  if (!updateResult) {
    return NextResponse.json(
      {
        message: "알 수 없는 오류로 실패했습니다. 다시 시도해 주세요.",
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }

  return NextResponse.json(
    {
      columnId: updateResult.column_id,
    },
    { status: StatusCodes.OK }
  );
};

export const deleteTask = async (taskId: number) => {
  const deleteSubTaskResult = await prisma.subTask.deleteMany({
    where: {
      task_id: taskId,
    },
  });

  const deleteResult = await prisma.task.delete({
    where: {
      task_id: taskId,
    },
  });

  if (!deleteResult && !deleteSubTaskResult) {
    return NextResponse.json(
      {},
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  return NextResponse.json(
    { message: "task 삭제에 성공했습니다" },
    {
      status: StatusCodes.ACCEPTED,
    }
  );
};
