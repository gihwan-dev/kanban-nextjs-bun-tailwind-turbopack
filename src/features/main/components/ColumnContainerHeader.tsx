import React from "react";
import OvalIcon from "@/assets/OvalIcon";

const ColumnContainerHeader: React.FC<{
  color: string;
  title: string;
  count: number;
}> = ({ color, title, count }) => {
  return (
    <header className={"whitespace-nowrap flex flex-row items-center gap-3"}>
      <OvalIcon fill={color} />
      <span className={"text-xs font-bold -text--Medium-Grey"}>
        {title.toUpperCase()} ({count})
      </span>
    </header>
  );
};

export default ColumnContainerHeader;
