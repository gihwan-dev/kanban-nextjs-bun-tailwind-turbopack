"use client";

import axios from "axios";
import Modal from "../UI/Modal";
import { SERVER_URL } from "@/const";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetBoardResponse } from "@/app/api/board/route";
import React, { useMemo, useState } from "react";
import { useAppDispatch } from "@/utils/hooks/redux-hooks";
import {
  DeleteModalState,
  setDeleteModal,
  setOpenModal,
} from "@/utils/redux/slices/deleteModal-slice";
import { useRouter } from "next/navigation";

const getBoardAxios = () => {
  return axios.get<GetBoardResponse[]>(`${SERVER_URL}/board`);
};

const deleteBoardAxios = (id: number) => {
  return axios.delete(`${SERVER_URL}/board/${id}`);
};

const deleteColumAxios = (id: number) => {
  return axios.delete(`${SERVER_URL}/column/${id}`);
};

const SettingModalItem: React.FC<{
  boardId: number;
  boardTitle: string;
  columns: GetBoardResponse["columns"];
}> = ({ boardTitle, columns, boardId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const onDeleteBoardHandler = () => {
    const deleteState: Pick<DeleteModalState, "type" | "id"> = {
      id: boardId,
      type: "board",
    };
    dispatch(setDeleteModal(deleteState));
    dispatch(setOpenModal());
  };

  const onDeleteColumnHandler = (columnId: number) => {
    const deleteState: Pick<DeleteModalState, "type" | "id"> = {
      id: columnId,
      type: "column",
    };
    dispatch(setDeleteModal(deleteState));
    dispatch(setOpenModal());
  };

  const onClickHandler = () => {
    setOpen(prev => !prev);
  };

  const list = useMemo(() => {
    return columns.map(item => {
      return (
        <li
          key={`${item.column_id}${item.title}modal`}
          className={"flex flex-row justify-between"}
        >
          <span className={"font-medium -text--Black"}>{item.title}</span>
          <button
            onClick={onDeleteColumnHandler.bind(null, item.column_id)}
            className={"-text--Red font-medium hover:-text--red-hover"}
          >
            delete
          </button>
        </li>
      );
    });
  }, [columns]);

  return (
    <ul className="flex w-full h-full flex-col border -border--Medium-Grey px-4 py-4 rounded-md gap-4 items-center">
      <div className="w-full justify-between flex">
        <span className={"font-bold"}>{boardTitle}</span>
        <div className={"flex flex-row gap-4"}>
          <button
            className={"-text--Red font-bold hover:-text--red-hover"}
            onClick={onDeleteBoardHandler}
          >
            delete
          </button>
          <button
            className={
              "-text--Main-Purple hover:-text--main-purple-hover font-bold"
            }
            onClick={onClickHandler}
          >
            {open ? "close" : "open"}
          </button>
        </div>
      </div>
      {open && <div className={"flex flex-col w-full"}>{...list}</div>}
    </ul>
  );
};

const SettingModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoardAxios,
  });

  const onCloseHandler = () => {
    onClose();
    router.refresh();
  };

  return (
    <Modal onBackdropClick={onCloseHandler}>
      <div className="flex flex-col gap-6 px-8 py-8 -bg--White w-screen max-w-lg rounded-lg">
        <header className={"-text--Black font-bold text-xl"}>Settings</header>
        <main className="flex flex-col gap-2 max-h-96 overflow-auto">
          {data?.data.map(item => {
            return (
              <SettingModalItem
                boardId={item.board_id}
                boardTitle={item.title}
                columns={item.columns}
                key={`${item.board_id}`}
              />
            );
          })}
        </main>
        <footer>
          <button
            onClick={onCloseHandler}
            className={
              "w-full text-center -bg--Red py-2 rounded-3xl -text--White font-bold hover:-bg--red-hover"
            }
          >
            Close
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default SettingModal;
