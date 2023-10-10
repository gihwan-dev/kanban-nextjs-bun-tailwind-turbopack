"use client";

import { createPortal } from "react-dom";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import IconCross from "@/assets/icon-cross";
import { validateColumns } from "@/utils/validatation";
import { useAddBoard } from "../hooks";
import LoadingModal from "@/components/LoadingModal";

const labelClassName = "text-sm font-bold -text--Medium-Grey";

const inputClassName =
  "py-2 px-4 border -border--Medium-Grey border-opacity-25 rounded-lg font-medium -text--Black";

const CreateBoardModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState<string[]>([
    Math.random().toString().slice(0),
  ]);

  const { mutate, isSuccess, isLoading } = useAddBoard();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const boardNameElement = form.elements[0] as HTMLInputElement;

    const columnList = columns.map((_, index) => {
      const columnInputElement = form.elements[index + 1] as HTMLInputElement;
      return columnInputElement.value;
    });

    if (!validateColumns(columnList)) {
      return;
    }
    mutate({ boardName: boardNameElement.value, columns: columnList });
  };

  const onAddNewColumnHandler = () => {
    setColumns(prev => {
      return [...prev, Math.random().toString().slice(2)];
    });
  };

  const onDeleteColumnHandler = (targetIndex: number) => {
    setColumns(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isSuccess) {
    onClose();
  }

  return mounted
    ? createPortal(
        <Modal onBackdropClick={onClose}>
          <form
            className={
              "flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -bg--White p-6 rounded-lg gap-6 w-72"
            }
            onSubmit={onSubmitHandler}
          >
            <header className={"text-lg font-bold -text--Black"}>
              Add New Board
            </header>
            <div className={"flex flex-col gap-2"}>
              <label className={labelClassName}>Board Name</label>
              <input className={inputClassName} />
            </div>
            <div className={"flex flex-col gap-2"}>
              <label className={labelClassName}>Board Columns</label>
              {columns.map((item, index) => {
                return (
                  <div
                    className={"flex flex-row gap-4 items-center"}
                    key={`${item}CreateBoardModal`}
                  >
                    <input className={inputClassName} />
                    <IconCross
                      onClick={onDeleteColumnHandler.bind(null, index)}
                    />
                  </div>
                );
              })}
              <button
                onClick={onAddNewColumnHandler}
                className={
                  "py-2 -bg--Main-Purple bg-opacity-10 -text--Main-Purple font-bold rounded-full text-sm hover:-bg--White"
                }
                type={"button"}
              >
                + Add New Column
              </button>
            </div>
            <button
              className={
                "py-2 -bg--Main-Purple -text--White text-sm font-bold rounded-full hover:-bg--main-purple-hover"
              }
            >
              Create New Board
            </button>
          </form>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default CreateBoardModal;
