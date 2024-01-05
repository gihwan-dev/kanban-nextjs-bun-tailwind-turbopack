import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addColumnsFetch,
  addNewBoardFetch,
  createTaskFetch,
  getBoardsFetch,
  getColumnsFetch,
  getColumnsTaskCountFetch,
  getColumnsTasksFetch,
  getSubtasksFetch,
  setSubtasksFetch,
  setTasksColumnFetch,
  updateBoardFetch,
} from "../api";
import { CreateBoardDto } from "../types";
import { CreateNewTaskDto } from "@/types/task-type";
import { UpdateBoardDto } from "@/app/api/boards/[id]/type";

export const useGetSubtasks = (taskId: number) => {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: () => getSubtasksFetch(taskId),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

export const useAddBoard = () => {
  return useMutation({
    mutationKey: ["boards"],
    mutationFn: (data: CreateBoardDto) => addNewBoardFetch(data),
  });
};

export const useGetBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsFetch,
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationKey: ["tasks"],
    mutationFn: (data: CreateNewTaskDto) => createTaskFetch(data),
  });
};

export const useUpdateBoard = () => {
  return useMutation({
    mutationKey: ["boards"],
    mutationFn: ({ id, form }: { id: string; form: UpdateBoardDto }) =>
      updateBoardFetch(id, form),
  });
};
