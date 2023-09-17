import React from "react";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";

const TaskInfoModalHeader: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <header className={"flex flex-row justify-between items-center"}>
      <span className={"text-lg -text--Black font-bold"}>{title}</span>
      <IconVerticalEllipsis onClick={() => {}} />
    </header>
  );
};

export default TaskInfoModalHeader;
