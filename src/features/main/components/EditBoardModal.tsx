import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import { navState } from "../stores";
import { useDeleteColumn, useGetColumns } from "../hooks";
import { useParams } from "next/navigation";
import IconCross from "@/assets/icon-cross";
import { useQueryClient } from "@tanstack/react-query";

const EditBoardModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [mount, setMount] = useState(false);
  const [newColumns, setNewColumns] = useState<string[]>([]);

  const { mutate } = useDeleteColumn();

  const queryClient = useQueryClient();
  const params = useParams();

  const board = useRecoilValue(navState).selectedBoard;

  const {
    data: columns,
    isLoading,
    isError,
    refetch,
  } = useGetColumns(Number(params.id));

  useEffect(() => {
    setMount(true);
  });

  if (isLoading || isError) {
    return null;
  }

  const deleteExistingColumnHandler = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
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

  return (
    mount &&
    createPortal(
      <Modal onBackdropClick={onClose}>
        <main className="fixed flex flex-col -bg--White top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-8 rounded-lg gap-4 w-72">
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
                      defaultValue={item.title}
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
                onClick={addNewColumnHandler}
                className="-bg--Main-Purple bg-opacity-10 -text--Main-Purple font-bold py-2 rounded-full hover:-bg--White"
              >
                +Add New Column
              </button>
            </div>
          </ul>
          <button className="-bg--Main-Purple -text--White font-bold py-2 rounded-full hover:bg-opacity-25">
            Save Changes
          </button>
        </main>
      </Modal>,
      document.getElementById("modal") as Element,
    )
  );
};

export default EditBoardModal;
