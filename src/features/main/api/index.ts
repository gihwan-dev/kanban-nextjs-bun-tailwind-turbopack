import { SERVER_URL } from "@/const";
import { Board, Column, SubTask, Task } from "@prisma/client";
import { CreateBoardDto } from "../types";
import { CreateNewTaskDto } from "@/types/task-type";

export const getSubtasksFetch = async (taskId: number) => {
  const response = await fetch(`${SERVER_URL}/subtasks/${taskId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as SubTask[];
};

export const setSubtasksFetch = async (subTaskId: number, state: boolean) => {
  return fetch(`${SERVER_URL}/subtasks/${subTaskId}`, {
    method: "POST",
    body: JSON.stringify({
      state,
    }),
  });
};

export const setTasksColumnFetch = async (
  taskId: number,
  targetColumnId: number,
) => {
  return fetch(`${SERVER_URL}/tasks/${taskId}`, {
    method: "POST",
    body: JSON.stringify(targetColumnId),
  });
};

export const getColumnsFetch = async (boardId: number) => {
  const response = await fetch(`${SERVER_URL}/boards/${boardId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as Pick<
    Column,
    "column_id" | "title" | "board_id"
  >[];
};

export const getColumnsTaskCountFetch = async (columnId: number) => {
  const response = await fetch(`${SERVER_URL}/columns/${columnId}/count`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as number;
};

export const getColumnsTasksFetch = async (columnId: number) => {
  const response = await fetch(`${SERVER_URL}/tasks/${columnId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as Task[];
};

export const addColumnsFetch = async (boardId: number, data: string[]) => {
  return fetch(`${SERVER_URL}/boards/${boardId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addNewBoardFetch = async (data: CreateBoardDto) => {
  return fetch(`${SERVER_URL}/boards`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getBoardsFetch = async () => {
  const result = await fetch(`${SERVER_URL}/boards`);
  if (!result.ok) {
    throw new Error("Network response was not ok");
  }
  return (await result.json()) as Pick<Board, "board_id" | "title">[];
};

export const createTaskFetch = async (data: CreateNewTaskDto) => {
  return fetch(`${SERVER_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteColumnFetch = async (id: number) => {
  return fetch(`${SERVER_URL}/columns/${id}`, {
    method: "DELETE",
  });
};
