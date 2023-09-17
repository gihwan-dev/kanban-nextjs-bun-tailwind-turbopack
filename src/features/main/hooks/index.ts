import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubtasksFetch, setSubtasksFetch } from "../api";

export const useGetSubtasks = (taskId: number) => {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasksFetch(taskId),
    refetchOnWindowFocus: false,
    cacheTime: Number.POSITIVE_INFINITY,
  });
};

export const useSetSubtasks = () => {
  return useMutation({
    mutationKey: ["subtasks"],
    mutationFn: ({ subTaskId, state }: { subTaskId: number; state: boolean }) =>
      setSubtasksFetch(subTaskId, state),
  });
};
