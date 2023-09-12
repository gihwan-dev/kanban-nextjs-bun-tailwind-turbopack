"use client";

import Modal from "@/UI/Modal";
import React, { HTMLAttributes, useState } from "react";

import DeleteIcon from "@/public/assets/icon-cross.svg";

import Image from "next/image";
import axios from "axios";
import { SERVER_URL } from "@/const";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const componentsAttributes: Record<
  string,
  HTMLAttributes<HTMLElement>
> = {
  label: {
    className: "-text--Medium-Grey font-bold text-xs",
  },
  input: {
    className:
      "w-full text-sm font-semibold px-4 py-2 border -border--Medium-Grey rounded-s",
  },
  button: {
    className: "w-full rounded-3xl font-bold text-sm",
  },
};

export type CreateBoardFormData = {
  boardName: string;
  columns: string[];
};

const createBoardAxios = (formData: CreateBoardFormData) => {
  return axios.post(`${SERVER_URL}/board`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const CreateNewBoardModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [columns, setColumns] = useState<string[]>(["some thing"]);

  const mutation = useMutation({
    mutationFn: (formData: CreateBoardFormData) => createBoardAxios(formData),
  });

  const router = useRouter();

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

  const isValidForm = (boardName: string, targetColumns: string[]) => {
    if (boardName.trim().length === 0) {
      return false;
    }

    if (!targetColumns.every(column => column.trim().length !== 0)) {
      return false;
    }

    return true;
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const boardName = form.elements[0] as HTMLInputElement;

    const targetColumns = columns.map((_, index) => {
      const columnName = form.elements[index + 1] as HTMLInputElement;
      return columnName.value;
    });

    if (!isValidForm(boardName.value, targetColumns)) {
      window.alert("Input filed can't be empty");
      return;
    }

    mutation.mutate({
      boardName: boardName.value,
      columns: targetColumns,
    });
  };

  if (mutation.isSuccess) {
    window.alert("board 생성에 성공했습니다.");
    router.refresh();
  }

  return (
    <Modal onBackdropClick={() => onClose()}>
      <form
        onSubmit={onSubmitHandler}
        className="absolute top-1/2 left-1/2 p-8 flex flex-col gap-6 -translate-x-1/2 -translate-y-1/2 -bg--White rounded-md w-11/12 max-w-lg"
      >
        <header className="font-bold text-lg">Add New Board</header>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="Board name"
            className={componentsAttributes.label.className}
          >
            Name
          </label>
          <input
            className={componentsAttributes.input.className}
            placeholder="e.g. Web Design"
            id="Board name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={componentsAttributes.label.className}>
            Columns
          </label>
          <div className="flex flex-col gap-3 w-full">
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
          </div>
        </div>
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

export default CreateNewBoardModal;
