"use client";

import Modal from "@/UI/Modal";
import { componentsAttributes } from "../nav/CreateNewModal";
import { useState } from "react";

import Image from "next/image";

import DeleteIcon from "@/public/assets/icon-cross.svg";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import axios from "axios";
import { SERVER_URL } from "@/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createNewColumnsAxios = (boardId: number, columns: string[]) => {
  return axios.post(`${SERVER_URL}/column`, {
    boardId,
    columns,
  });
};

const AddColumnModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [columns, setColumns] = useState<string[]>([""]);

  const queryClient = useQueryClient();

  const boardId = useAppSelector(state => state.nav.id);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["createNewColumns", boardId],
    mutationFn: (columns: string[]) => createNewColumnsAxios(boardId, columns),
    onSuccess: () => {
      queryClient.invalidateQueries(["columns", boardId]);
    },
  });

  const onAddColumnHandler = () => {
    setColumns(prev => {
      const newColumns = [...prev, ""];
      return newColumns;
    });
  };

  const removeColumnHandler = (index: number) => {
    setColumns(prev => {
      const newColumns = prev.filter((_, i) => i !== index);
      return newColumns;
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const targetColumns = columns.map((_, index) => {
      const columnName = form.elements[index] as HTMLInputElement;
      return columnName.value;
    });

    mutate(targetColumns);
  };

  if (isSuccess) {
    window.alert("column 생성에 성공했습니다.");
    onClose();
  }

  return (
    <Modal onBackdropClick={onClose}>
      <form
        onSubmit={onSubmitHandler}
        className="p-8 flex flex-col gap-6 -bg--White rounded-md w-screen max-w-lg"
      >
        <header className="text-xl font-bold">Add New Column</header>
        <label
          htmlFor="add new column"
          className={componentsAttributes.label.className}
        >
          column
        </label>
        {columns.map((column, index) => {
          return (
            <div
              key={`${column}${index}Create`}
              className="flex w-full flex-row gap-4 flex-grow-0 items-center justify-between"
            >
              <input
                className={componentsAttributes.input.className}
                key={`${index}'th board columns`}
              />
              <Image
                onClick={removeColumnHandler.bind(null, index)}
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
          onClick={onAddColumnHandler}
        >
          +Add New Column
        </button>
        <button
          type="submit"
          className={`${componentsAttributes.button.className} -bg--Main-Purple -text--White py-2 whitespace-nowrap hover:-bg--main-purple-hover`}
        >
          Create New Board
        </button>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
