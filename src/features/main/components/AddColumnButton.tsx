"use client";

import { useState } from "react";
import AddNewColumnModal from "./AddNewColumnModal";

const AddColumnButton = () => {
  const [openModal, setOpenModal] = useState(false);

  const onCloseHandler = () => {
    setOpenModal(false);
  };

  const onClickHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <button
        onClick={onClickHandler}
        style={{
          background:
            "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)",
        }}
        className={
          "h-full px-12 rounded-md text-2xl font-bold -text--Medium-Grey whitespace-nowrap"
        }
      >
        + New Column
      </button>
      {openModal && <AddNewColumnModal onClose={onCloseHandler} />}
    </>
  );
};

export default AddColumnButton;
