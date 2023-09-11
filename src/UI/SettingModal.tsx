"use client";

import axios from "axios";
import Modal from "./Modal";
import { SERVER_URL } from "@/const";
import { useQuery } from "@tanstack/react-query";
import { GetBoardResponse } from "@/app/api/board/route";
import { useMemo, useState } from "react";

const getBoardAxios = () => {
  return axios.get<GetBoardResponse[]>(`${SERVER_URL}/board`);
};

const SettingModalItem: React.FC<{
  boardTitle: string;
  columns: GetBoardResponse["columns"];
}> = ({ boardTitle, columns }) => {
  const list = useMemo(() => {
    return columns.map((item) => {
      return (
        <li key={`${item.column_id}${item.title}modal`}>
          <span>{item.title}</span>
          <button>Delete</button>
        </li>
      );
    });
  }, [columns]);

  const [open, setOpen] = useState();
  return (
    <ul className="flex w-full h-full">
      <div className="w-full justify-between flex">
        <span>{boardTitle}</span>
        <button>open</button>
      </div>
      {open && list}
    </ul>
  );
};

const SettingModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoardAxios,
  });

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <Modal onBackdropClick={onCloseHandler}>
      <div className="flex flex-col gap-6 px-8 py-8 -bg--White w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <header>Settings</header>
        <main>
          {data?.data.map((item) => {
            return (
              <SettingModalItem
                boardTitle={item.title}
                columns={item.columns}
                key={`${item.board_id}`}
              />
            );
          })}
        </main>
        <footer>
          <button>Close</button>
        </footer>
      </div>
    </Modal>
  );
};

export default SettingModal;
