"use client";

import { CreateBoardModal } from "@/features/main";
import { useState } from "react";

const MainHomePage = () => {
  const [openModal, setOpenModal] = useState(false);

  const onClickHandler = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <button
        onClick={onClickHandler}
        className="font-bold text-lg py-2 -bg--Main-Purple px-8 rounded-full -text--White hover:-bg--main-purple-hover"
      >
        Let{"'"} create a board.
      </button>
      {openModal && <CreateBoardModal onClose={onClickHandler} />}
    </main>
  );
};
export default MainHomePage;
