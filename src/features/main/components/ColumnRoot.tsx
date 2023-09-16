import React from "react";
import { RootColumn } from "@/types/prisma-type";
import ColumnContainer from "./ColumnContainer";

const ColumnRoot: React.FC<{
  columns: RootColumn[];
}> = ({ columns }) => {
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
