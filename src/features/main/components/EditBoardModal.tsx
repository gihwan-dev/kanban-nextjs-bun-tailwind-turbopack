import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { navState } from "../stores";
import { useGetColumns, useUpdateBoard } from "../hooks";
import { useParams } from "next/navigation";
import IconCross from "@/assets/icon-cross";
import { deleteModalState } from "@/stores";
import { UpdateBoardDto } from "@/app/api/boards/[id]/type";

const EditBoardModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [mount, setMount] = useState(false);
  const [newColumns, setNewColumns] = useState<string[]>([]);

  const [_, setDeleteState] = useRecoilState(deleteModalState);

  const params = useParams();

  const board = useRecoilValue(navState).selectedBoard;

  const { mutate } = useUpdateBoard();

  const {
    data: columns,
    isLoading,
    isError,
  } = useGetColumns(Number(params.id));

  useEffect(() => {
    setMount(true);
  });

  if (isLoading || isError) {
    return null;
  }

  const deleteExistingColumnHandler = (id: number) => {
    setDeleteState({
      isOpen: true,
      targetId: id,
      title: "column",
      type: "columns",
    });
  };

  const deleteNewColumnHandler = (targetIndex: number) => {
    setNewColumns(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const addNewColumnHandler = () => {
    setNewColumns(prev => [...prev, Math.random().toFixed(2).toString()]);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;

    const targetColumns = columns?.map((item, index) => {
      const inputElement = formElement.elements[index + 1] as HTMLInputElement;
      return inputElement.value;
    });

    const targetNewColumns = newColumns.map((item, index) => {
      const inputElement = formElement.elements[
        index + columns.length
      ] as HTMLInputElement;
      return inputElement.value;
    });

    const id = params.id as string;
    const form: UpdateBoardDto = {
      title: board.title,
      newColumns: [...targetNewColumns],
      columns: [...targetColumns],
    };
    mutate({ id, form });
  };

  return (
    mount &&
    createPortal(
      <Modal onBackdropClick={onClose}>
        <form
          onSubmit={onSubmitHandler}
          className="fixed flex flex-col -bg--White top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-8 rounded-lg gap-4 w-72"
        >
          <h1 className="text-xl font-bold">Edit Board</h1>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold -text--Medium-Grey">
              Board Name
            </label>
            <input
              defaultValue={board.title}
              className="border -border--lines-light px-4 py-2 flex-1"
            />
          </div>
          <ul className="flex flex-col gap-2">
            <label className="text-xs font-bold -text--Medium-Grey">
              Board Columns
            </label>
            <div className="flex flex-col gap-3">
              {columns.map(item => {
                return (
                  <li
                    className="flex flex-row items-center w-full gap-3"
                    key={item.column_id + "EditBoardModal"}
                  >
                    <input
                      defaultValue={item.title + " (existing)"}
                      className="border -border--lines-light px-4 py-2 flex-1"
                    ></input>
                    <IconCross
                      onClick={deleteExistingColumnHandler.bind(
                        null,
                        item.column_id,
                      )}
                    />
                  </li>
                );
              })}
              {newColumns.map((item, index) => {
                return (
                  <li
                    className="flex flex-row items-center w-full gap-3"
                    key={`${item}`}
                  >
                    <input className="border -border--lines-light px-4 py-2 flex-1"></input>
                    <IconCross
                      onClick={deleteNewColumnHandler.bind(null, index)}
                    />
                  </li>
                );
              })}
              <button
                type="button"
                onClick={addNewColumnHandler}
                className="-bg--Main-Purple bg-opacity-10 -text--Main-Purple font-bold py-2 rounded-full hover:-bg--White"
              >
                +Add New Column
              </button>
            </div>
          </ul>
          <button
            type="submit"
            className="-bg--Main-Purple -text--White font-bold py-2 rounded-full hover:bg-opacity-25"
          >
            Save Changes
          </button>
        </form>
      </Modal>,
      document.getElementById("modal") as Element,
    )
  );
};

export default EditBoardModal;
