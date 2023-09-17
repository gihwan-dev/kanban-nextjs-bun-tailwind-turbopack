"use client";

import React, { useEffect } from "react";
import { Column } from "@prisma/client";
import { useRecoilState } from "recoil";
import { columnsState } from "../stores";

const SetColumnComponents: React.FC<{
  columns: Pick<Column, "column_id" | "title" | "board_id">[];
}> = ({ columns }) => {
  const [_, setColumns] = useRecoilState(columnsState);
  useEffect(() => {
    setColumns(columns);
  }, [columns, setColumns]);
  return <></>;
};

export default SetColumnComponents;
