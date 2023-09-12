import Modal from "@/UI/Modal";
import React, { useEffect, useState } from "react";

import EclipsSvg from "@/components/nav/SvgComponent/EclipsSvg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux-hooks";
import axios, { AxiosResponse } from "axios";
import { GetColumn } from "../../BodyRoot";
import { SubTask } from "@prisma/client";
import { SERVER_URL } from "@/const";
import {
  DeleteModalState,
  setDeleteModal,
  setOpenModal,
} from "@/utils/redux/slices/deleteModal-slice";

const labelClassName = "font-bold text-xs -text--Medium-Grey";

export type GetTaskDto = {
  task_id: number;
  title: string;
  description: string;
  column_id: number;
  subTasks: Pick<SubTask, "state" | "title" | "subtask_id">[];
};

export const getTaskAxios = (taskId: number) => {
  return axios.get<GetTaskDto>(`${SERVER_URL}/task/${taskId}`);
};

const updateSubTaskAxios = (subTaskId: number, state: boolean) => {
  return axios.patch(`${SERVER_URL}/subTask/${subTaskId}`, {
    state,
  });
};

const updateTaskStateAxios = (taskId: number, columnId: number) => {
  return axios.patch<{ columnId: number }>(`${SERVER_URL}/task/${taskId}`, {
    columnId,
  });
};

const TaskModal: React.FC<{
  taskId: number;
  onClose: () => void;
}> = ({ taskId, onClose }) => {
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  const [openMenu, setOpenMenu] = useState(false);

  const queryClient = useQueryClient();

  const selectedBoardId = useAppSelector(state => state.nav.id);

  const deleteState = useAppSelector(state => state.delete);
  const dispatch = useAppDispatch();

  const { data: columnData } = useQuery<AxiosResponse<GetColumn[]>>([
    "columns",
    selectedBoardId,
  ]);

  const { data: taskData, refetch } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskAxios(taskId),
  });

  const { mutate: mutateSubTask } = useMutation({
    mutationKey: ["updateSubTask", taskId],
    mutationFn: ({ subTaskId, state }: { subTaskId: number; state: boolean }) =>
      updateSubTaskAxios(subTaskId, state),
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["tasks", taskData?.data.column_id]);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["updateTaskState", taskId],
    mutationFn: ({ taskId, columnId }: { taskId: number; columnId: number }) =>
      updateTaskStateAxios(taskId, columnId),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    const totalCount = taskData?.data.subTasks.length;
    const doneCount = taskData?.data.subTasks.reduce((acc, item) => {
      if (item.state) {
        return acc + 1;
      }
      return 0;
    }, 0);
    setTotal(totalCount ?? 0);
    setDone(doneCount ?? 0);
  }, [taskData?.data.subTasks]);

  // TODO : 변경점 생길 때 마다 mutate 해줘야함.
  // TODO : column 종류 받아와서 드랍다운 버튼에 표기 해줘야함.
  // TODO : 커스텀 체크박스 만들어야 함.

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    mutate({ taskId, columnId: Number(e.target.value) });
  };

  const handleSubTaskChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetId: number,
  ) => {
    mutateSubTask({ subTaskId: targetId, state: e.target.checked });
  };

  const onDeleteHandler = () => {
    const deleteModalState: Pick<DeleteModalState, "id" | "type"> = {
      id: taskId,
      type: "task",
    };
    dispatch(setDeleteModal(deleteModalState));
    dispatch(setOpenModal());
  };

  return (
    <React.Fragment>
      <Modal onBackdropClick={onClose}>
        <form className="flex absolute top-1/2 left-1/2 flex-col gap-6 -bg--White -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg p-8 rounded-md">
          <header className="flex gap-6 flex-row items-center justify-between">
            <span className="text-lg -text--Black font-bold">
              {taskData?.data.title}
            </span>
            <div
              onClick={() => setOpenMenu(true)}
              className="cursor-pointer relative"
            >
              <EclipsSvg />
              {openMenu && (
                <ul
                  className="absolute top-8 -left-20 flex flex-col"
                  onMouseLeave={() => setOpenMenu(false)}
                >
                  <li className="px-6 py-2 -bg--Red rounded-3xl font-bold -text--White hover:-bg--red-hover">
                    <button onClick={onDeleteHandler} type="button">
                      delete
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </header>
          <p className="font-medium -text--Medium-Grey text-sm">
            {taskData?.data.description}
          </p>
          <div className="flex flex-col gap-4">
            <label className={labelClassName}>
              Subtasks ({done} of {total})
            </label>
            {taskData?.data.subTasks.map(item => {
              return (
                <div
                  className={
                    "flex flex-row gap-4 p-3 items-center -bg--light-grey-light-bg rounded-md"
                  }
                  key={`${item.title}task with subtask modal`}
                >
                  <input
                    type="checkbox"
                    id={item.title}
                    onChange={e => handleSubTaskChange(e, item.subtask_id)}
                    defaultChecked={item.state}
                  />
                  <label
                    htmlFor={item.title}
                    className={`text-xs "-text--Black" font-bold ${
                      item.state ? "line-through opacity-50" : ""
                    }`}
                  >
                    {item.title}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Current Status</label>
            <div className="w-full px-4 py-2  border -border--Medium-Grey rounded-s">
              <select
                onChange={handleStatusChange}
                id="status"
                defaultValue={taskData?.data.column_id}
                className="w-full border-none focus:outline-none"
              >
                {columnData?.data.map(item => {
                  return (
                    <option
                      value={item.column_id}
                      key={`${item.column_id} ${item.title} tasks modal`}
                    >
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default TaskModal;
