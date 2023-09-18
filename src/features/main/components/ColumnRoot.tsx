"use client";

import React, { useEffect } from "react";
import { RootColumn } from "@/types/prisma-type";
import ColumnContainer from "./ColumnContainer";
import { useRecoilState } from "recoil";
import { columnsState } from "../stores";

const ColumnRoot: React.FC<{
  columns: RootColumn[];
}> = ({ columns }) => {
  const [_, setColumns] = useRecoilState(columnsState);

  useEffect(() => {
    setColumns(columns);
  }, [setColumns, columns]);

  return (
    <>
      {columns.map(item => {
        return (
          <ColumnContainer
            key={`${item.column_id} ColumnContainer`}
            column={item}
          />
        );
      })}
    </>
  );
};

export default ColumnRoot;
