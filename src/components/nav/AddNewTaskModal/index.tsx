"use client";

import Modal from "@/UI/Modal";
import React, { useState } from "react";

import Image from "next/image";

import DeleteIcon from "@/public/assets/icon-cross.svg";
import { componentsAttributes } from "../CreateNewModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { GetColumn } from "@/components/body/BodyRoot";
import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "@/const";

export type AddNewTaskDto = {
  title: string;
  description: string;
  subTasks: string[];
  columnId: number;
};

const addNewTaskAxios = (addNewTaskDto: AddNewTaskDto) => {
  return axios.post(`${SERVER_URL}/task`, addNewTaskDto);
};

const AddNewTaskModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [subTasks, setSubTasks] = useState<string[]>([""]);

  const boardId = useAppSelector((state) => state.nav.id);

  const { data } = useQuery<AxiosResponse<GetColumn[]>>(["columns", boardId]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (addNewTaskDto: AddNewTaskDto) =>
      addNewTaskAxios(addNewTaskDto),
    mutationKey: ["addNewTask", boardId],
  });

  const onAddSubtaskHandler = () => {
    setSubTasks((prev) => {
      const newSubTasks = [...prev, ""];
      return newSubTasks;
    });
  };

  const onRemoveSubtaskHandler = (index: number) => {
    setSubTasks((prev) => {
      const newSubTasks = prev.filter((_, i) => i !== index);
      return newSubTasks;
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const title = form.elements[0] as HTMLInputElement;
    const description = form.elements[1] as HTMLTextAreaElement;

    const subTasksElement = subTasks.map((_, index) => {
      const subTask = form.elements[index + 2] as HTMLInputElement;
      return subTask.value;
    });

    const columnId = form.elements[3 + subTasks.length] as HTMLSelectElement;

    const addNewTaskDto: AddNewTaskDto = {
      title: title.value,
      description: description.value,
      subTasks: subTasksElement,
      columnId: Number(columnId.value),
    };

    mutate(addNewTaskDto, {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", Number(columnId.value)]);
        window.alert("task 생성에 성공했습니다.");
        onClose();
      },
    });
  };

  return (
    <Modal onBackdropClick={onClose}>
      <form
        onSubmit={onSubmitHandler}
        className="p-8 flex flex-col gap-6 -translate-x-1/2 -translate-y-1/2 -bg--White rounded-md w-11/12 max-w-lg"
      >
        <header className="text-lg font-bold -text--Black">Add New Task</header>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-xs -text--Medium-Grey font-bold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Take coffee break"
            className={`${componentsAttributes.input.className}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-xs -text--Medium-Grey font-bold"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            className="px-4 py-2 w-full border -border--Medium-Grey h-28 rounded-s"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subtasks"
            className="text-xs font-bold -text--Medium-Grey"
          >
            Subtasks
          </label>
          {subTasks.map((item, index) => {
            return (
              <div
                key={`${item}${index}Create`}
                className="flex gap-4 w-full flex-row flex-grow-0 items-center justify-between"
              >
                <input
                  id="subtasks"
                  className={componentsAttributes.input.className}
                  key={`${index}'th board items`}
                />
                <Image
                  onClick={onRemoveSubtaskHandler.bind(null, index)}
                  className="cursor-pointer"
                  src={DeleteIcon}
                  alt="delete icon"
                />
              </div>
            );
          })}
          <button
            type="button"
            className={`${componentsAttributes.button.className} -bg--Main-Purple -text--Main-Purple py-2 bg-opacity-10 text--White hover:bg-opacity-25`}
            onClick={onAddSubtaskHandler}
          >
            +Add New Column
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="status"
            className="text-xs font-bold -text--Medium-Grey"
          >
            status
          </label>
          <div className="w-full px-4 py-2  border -border--Medium-Grey rounded-s">
            <select
              id="status"
              defaultValue={data?.data[0].column_id}
              className="w-full border-none focus:outline-none"
            >
              {data?.data?.map((item) => {
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
        <button
          className={`${componentsAttributes.button.className} -bg--Main-Purple -text--White py-2 whitespace-nowrap hover:-bg--main-purple-hover`}
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default AddNewTaskModal;
