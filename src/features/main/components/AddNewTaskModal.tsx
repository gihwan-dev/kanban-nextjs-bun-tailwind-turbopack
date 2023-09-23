import ColumnStatusBar from "./ColumnStatusBar";
import InputWithLabel from "@/components/InputWithLabel";
import LabelWithMultipleInput from "@/components/LabelWithMultipleIInput";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { useCreateTask, useGetColumnsTask } from "../hooks";
import { CreateNewTaskDto } from "@/types/task-type";
import { useQueryClient } from "@tanstack/react-query";

const AddNewTaskModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [inputList, setInputList] = useState([
    Math.random().toString().slice(2),
  ]);

  const { mutate } = useCreateTask();

  const queryClient = useQueryClient();

  const onClickDeleteIconHandler = (targetIndex: number) => {
    if (inputList.length === 1) {
      return;
    }
    setInputList(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const onClickAddBtnHandler = () => {
    setInputList(prev => {
      return [...prev, Math.random().toString().slice(2)];
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const taskTitleElement = form.elements[0] as HTMLInputElement;
    const taskDescriptionElement = form.elements[1] as HTMLInputElement;

    const subtasksValues = inputList.map((_, index) => {
      const subtasksElement = form[index + 2] as HTMLInputElement;
      return subtasksElement.value;
    });

    const taskStatusElement = form[inputList.length + 3] as HTMLSelectElement;

    const dto: CreateNewTaskDto = {
      title: taskTitleElement.value,
      description: taskDescriptionElement.value,
      subtasks: subtasksValues,
      status: Number(taskStatusElement.value),
    };

    mutate(dto, {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "columns",
          "tasks",
          Number(taskStatusElement.value),
        ]);
        onClose();
      },
    });
  };

  return (
    <Modal onBackdropClick={onClose}>
      <form
        onSubmit={onSubmitHandler}
        className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-6 -bg--White rounded-lg gap-6"
      >
        <header className="-text--Black text-lg font-bold">Add New Task</header>
        <InputWithLabel
          placeholder="e.g. Take coffee break"
          labelTitle="Title"
        />
        <InputWithLabel
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          labelTitle="Description"
        />
        <LabelWithMultipleInput
          labelTitle="SubTasks"
          placeholder=""
          inputList={inputList}
          onClickDelete={onClickDeleteIconHandler}
          onClickAdd={onClickAddBtnHandler}
        />
        <ColumnStatusBar />
        <button className="py-2 w-full -bg--Main-Purple hover:-bg--main-purple-hover -text--White font-bold text-sm rounded-full">
          Create Task
        </button>
      </form>
    </Modal>
  );
};

export default AddNewTaskModal;
