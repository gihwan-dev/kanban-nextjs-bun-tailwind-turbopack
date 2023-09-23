"use client";

import React, { useEffect } from "react";
import { RootColumn } from "@/types/prisma-type";
import ColumnContainer from "./ColumnContainer";
import { useRecoilState } from "recoil";
import { columnsState } from "../stores";
import { useParams } from "next/navigation";
import { useGetColumns } from "../hooks";

const ColumnRoot: React.FC<{}> = () => {
  const params = useParams();

  const { data: columns } = useGetColumns(Number(params.id));

  return (
    <>
      {columns?.map(item => {
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
