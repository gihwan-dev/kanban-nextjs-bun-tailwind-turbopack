import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addColumnsFetch,
  getColumnsFetch,
  getColumnsTaskCountFetch,
  getColumnsTasksFetch,
  getSubtasksFetch,
  setSubtasksFetch,
  setTasksColumnFetch,
} from "../api";

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

export const useSetTasksColumn = () => {
  return useMutation({
    mutationKey: ["subtasks"],
    mutationFn: ({
      taskId,
      targetColumnId,
    }: {
      taskId: number;
      targetColumnId: number;
    }) => setTasksColumnFetch(taskId, targetColumnId),
  });
};

export const useGetColumns = (boardId: number) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getColumnsFetch(boardId),
  });
};

export const useGetColumnsTaskCount = (columnId: number) => {
  return useQuery({
    queryKey: ["columns", "tasks", "count", columnId],
    queryFn: () => getColumnsTaskCountFetch(columnId),
  });
};

export const useGetColumnsTask = (columnId: number) => {
  return useQuery({
    queryKey: ["columns", "tasks", columnId],
    queryFn: () => getColumnsTasksFetch(columnId),
  });
};

export const useAddColumns = () => {
  return useMutation({
    mutationKey: ["columns"],
    mutationFn: ({ boardId, data }: { boardId: number; data: string[] }) =>
      addColumnsFetch(boardId, data),
  });
};
