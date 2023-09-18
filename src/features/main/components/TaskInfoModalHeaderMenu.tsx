import React, { useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { useRecoilState } from "recoil";
import { deleteModalState } from "@/stores";

const TaskInfoModalHeaderMenu: React.FC<{
  taskId: number;
  onClose: () => void;
  title: string;
}> = ({ taskId, onClose, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [_, setDeleteStateData] = useRecoilState(deleteModalState);

  const onClickHandler = () => {
    // setDeleteStateData({
    //   title,
    //   type,
    // })
    onClose();

    setIsMenuOpen(true);
  };
  return (
    <ul
      className={
        "absolute right-0 translate-x-1/2 top-12 -bg--White p-4 rounded-lg"
      }
    >
      <button
        onClick={() => {}}
        className={"-text--Red hover:-text--red-hover"}
      >
        Delete
      </button>
      <DeleteModal />
    </ul>
  );
};

export default TaskInfoModalHeaderMenu;
