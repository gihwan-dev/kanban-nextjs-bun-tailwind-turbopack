import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { navState } from "../stores";
import { createPortal } from "react-dom";
import IconCross from "@/assets/icon-cross";
import { useAddColumns } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";

const AddNewColumnModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const navStateData = useRecoilValue(navState);

  const [inputList, setInputList] = useState<string[]>([""]);

  const [mounted, setMounted] = useState(false);

  const { mutate, isSuccess } = useAddColumns();

  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDeleteInputHandler = (targetIndex: number) => {
    setInputList(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const onAddInputHandler = () => {
    setInputList(prev => {
      return [...prev, Math.random().toString().slice(2)];
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const boardId = +navStateData.selectedBoard.board_id;
    const form = e.target as HTMLFormElement;
    const data = inputList.map((_, index) => {
      const columnName = form.elements[index] as HTMLInputElement;
      return columnName.value;
    });
    mutate(
      { boardId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "columns",
            +navStateData.selectedBoard.board_id,
          ]);
          onClose();
        },
      },
    );
  };

  return mounted
    ? createPortal(
        <Modal onBackdropClick={onClose}>
          <form
            onSubmit={onSubmitHandler}
            className={
              "absolute w-72 -bg--White top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 pt-6 pb-8 flex flex-col gap-6 rounded-lg"
            }
          >
            <header className={"text-lg -text--Black font-bold"}>
              Add New Column
            </header>
            <ul className={"flex flex-col gap-2"}>
              <header className={"-text--Medium-Grey font-bold text-xs"}>
                columns
              </header>
              {inputList.map((item, index) => {
                return (
                  <div
                    className={"flex flex-row items-center gap-4"}
                    key={`${item}AddNewColumnModalInput`}
                  >
                    <input
                      className={
                        "w-full py-2 px-4 -text--Black text-sm rounded-lg -border--Medium-Grey border border-opacity-25"
                      }
                    />
                    <IconCross
                      onClick={onDeleteInputHandler.bind(null, index)}
                    />
                  </div>
                );
              })}
              <button
                className={
                  "py-2 -bg--Main-Purple bg-opacity-10 rounded-full w-full -text--Main-Purple font-bold text-sm hover:-bg--White"
                }
                onClick={onAddInputHandler}
                type="button"
              >
                + Add New Column
              </button>
            </ul>
            <button
              className={
                "py-2 rounded-full -bg--Main-Purple -text--White text-sm -text--Main-Purple font-bold hover:-bg--main-purple-hover"
              }
            >
              Save Changes
            </button>
          </form>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default AddNewColumnModal;
