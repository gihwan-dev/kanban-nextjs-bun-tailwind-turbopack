import { SERVER_URL } from "@/const";
import { Column, SubTask, Task } from "@prisma/client";

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
