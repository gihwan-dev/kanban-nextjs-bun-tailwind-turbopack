import { useQuery } from "@tanstack/react-query";
import { getSubtasksFetch } from "../api";

export const useGetSubtasks = (taskId: number) => {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasksFetch(taskId),
  });
};
