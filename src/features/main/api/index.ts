import { SERVER_URL } from "@/const";
import { SubTask } from "@prisma/client";

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
