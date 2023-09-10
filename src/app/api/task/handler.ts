import { AddNewTaskDto } from "@/components/nav/AddNewTaskModal";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const addNewTask = async (addNewTaskDto: AddNewTaskDto) => {
  const addTaskResult = await prisma.task.create({
    data: {
      title: addNewTaskDto.title,
      description: addNewTaskDto.description,
      column_id: addNewTaskDto.columnId,
    },
    select: {
      task_id: true,
    },
  });

  const addSubTaskResult = await prisma.subTask.createMany({
    data: addNewTaskDto.subTasks.map((subTask) => {
      return {
        title: subTask,
        task_id: addTaskResult.task_id,
      };
    }),
  });

  if (!addTaskResult || !addSubTaskResult) {
    return NextResponse.json(
      {
        message: "task 생성에 실패했습니다.",
      },
      {
        status: StatusCodes.BAD_REQUEST,
      }
    );
  }

  return NextResponse.json(
    {
      message: "task 생성에 성공했습니다.",
    },
    {
      status: StatusCodes.OK,
    }
  );
};
