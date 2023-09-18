import React from "react";
import { useRecoilState } from "recoil";
import { deleteModalState } from "@/stores";

const TaskInfoModalHeaderMenu: React.FC<{
  taskId: number;
  onClose: () => void;
  title: string;
}> = ({ taskId, onClose, title }) => {
  const [_, setDeleteStateData] = useRecoilState(deleteModalState);

  const onClickHandler = () => {
    setDeleteStateData({
      title,
      type: "tasks",
      isOpen: true,
      targetId: taskId,
    });
    onClose();
  };
  return (
    <ul
      className={
        "absolute right-0 translate-x-1/2 top-12 -bg--White p-4 rounded-lg"
      }
    >
      <button
        onClick={onClickHandler}
        className={"-text--Red hover:-text--red-hover"}
      >
        Delete
      </button>
    </ul>
  );
};

export default TaskInfoModalHeaderMenu;
