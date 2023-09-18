import { useMutation } from "@tanstack/react-query";
import { SERVER_URL } from "@/const";

const deleteTaskFetch = async (
  targetId: number,
  type: "tasks" | "columns" | "boards" | "subtasks",
) => {
  return fetch(`${SERVER_URL}/${type}/${targetId}`, {
    method: "DELETE",
  });
};

export const useDelete = () => {
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: ({
      targetId,
      type,
    }: {
      targetId: number;
      type: "tasks" | "columns" | "boards" | "subtasks";
    }) => deleteTaskFetch(targetId, type),
  });
};
