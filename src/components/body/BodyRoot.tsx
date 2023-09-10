"use client";

import { SERVER_URL } from "@/const";
import BodyColumn from "./BodyColum/BodyColumn";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { Column } from "@prisma/client";
import React, { useState } from "react";
import AddColumnModal from "./AddColumnModal";

export type GetColumn = Pick<Column, "column_id" | "title">;

const columnsAxios = (boardId: number) => {
  return axios.get<GetColumn[]>(`${SERVER_URL}/board/${boardId}`);
};

const BodyRoot = () => {
  const selectedBoardId = useAppSelector((state) => state.nav.id);

  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["columns", selectedBoardId],
    queryFn: () => columnsAxios(selectedBoardId),
    refetchInterval: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      {data?.data.map((item) => {
        return (
          <BodyColumn
            key={`${item.column_id} body column`}
            title={item.title}
            columnId={item.column_id}
          />
        );
      })}

      <button
        onClick={() => setOpenModal(true)}
        style={{
          background:
            "linear-gradient(180deg, #E9EEFA 0%, rgba(233, 238, 250, 0.50) 100%)",
        }}
        className="px-14 -bg--add-task-bg rounded-md font-bold text-2xl -text--Medium-Grey flex-shrink-0 box-border"
      >
        + New Column
      </button>
      {openModal && <AddColumnModal onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default BodyRoot;
