import React, { useState } from "react";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";
import TaskInfoModalHeaderMenu from "./TaskInfoModalHeaderMenu";

const TaskInfoModalHeader: React.FC<{
  title: string;
  taskId: number;
  onClose: () => void;
}> = ({ title, taskId, onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickHandler = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={"flex flex-row justify-between items-center relative"}>
      <span className={"text-lg -text--Black font-bold"}>{title}</span>
      <IconVerticalEllipsis onClick={onClickHandler} />
      {isMenuOpen && (
        <TaskInfoModalHeaderMenu
          onClose={onClose}
          title={title}
          taskId={taskId}
        />
      )}
    </header>
  );
};

export default TaskInfoModalHeader;
