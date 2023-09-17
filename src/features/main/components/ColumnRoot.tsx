import React from "react";
import { RootColumn } from "@/types/prisma-type";
import ColumnContainer from "./ColumnContainer";
import SetColumnComponents from "./SetColumnComponents";

const ColumnRoot: React.FC<{
  columns: RootColumn[];
}> = ({ columns }) => {
  return (
    <>
      <SetColumnComponents columns={columns} />
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
