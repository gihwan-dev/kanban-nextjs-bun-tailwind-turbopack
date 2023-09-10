"use client";

import { useEffect, useState } from "react";
import ListLogo from "@/public/assets/icon-board.svg";
import SelectedLogo from "@/public/assets/icon-board-selected.svg";
import CreateLogo from "@/public/assets/icon-board-create.svg";

import Image from "next/image";
import React from "react";
import { Board } from "prisma/prisma-client";
import CreateNewBoardModal from "../CreateNewModal";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux-hooks";
import { setNavState } from "@/utils/redux/slices/nav-slice";

const basicStyle = `flex flex-row gap-4 items-center pt-4 pb-4 font-bold cursor-pointer box-border`;
const createStyle = basicStyle + " " + `-text--Main-Purple`;
const normalStyle = basicStyle + " " + `-text--Medium-Grey`;
const selectedStyle =
  basicStyle + " " + `-bg--Main-Purple -text--White rounded-r-full`;

const SideNavItem: React.FC<{
  data: Pick<Board, "title" | "board_id">[];
}> = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const selectedBoardId = useAppSelector((state) => state.nav.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setNavState(data[0].board_id));
    }
  }, []);

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      {data.map((item) => {
        return (
          <li
            onClick={() => dispatch(setNavState(item.board_id))}
            className={`${
              selectedBoardId === item.board_id ? selectedStyle : normalStyle
            } pl-8`}
            key={`${item.board_id} side nav`}
          >
            <Image
              src={selectedBoardId === item.board_id ? SelectedLogo : ListLogo}
              alt="list logo"
            />
            <span>{item.title}</span>
          </li>
        );
      })}
      <li
        onClick={() => setOpenModal(true)}
        className={`${createStyle} pl-8`}
      >
        <Image
          src={CreateLogo}
          alt="create logo"
        />
        <span>+Create New Board</span>
      </li>
      {openModal && <CreateNewBoardModal onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default SideNavItem;
