import { useGetColumns } from "../hooks";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

const ColumnStatusBar = () => {
  const params = useParams();

  const { data: columns } = useGetColumns(Number(params.id));

  if (!columns) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="-text--Medium-Grey font-bold text-xs">Status</label>
      <Select
        aria-label="select column"
        radius="sm"
        labelPlacement="outside-left"
      >
        {columns.map(item => {
          return (
            <SelectItem
              aria-label={item.title}
              value={item.column_id}
              key={item.column_id}
            >
              {item.title}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};

export default ColumnStatusBar;
