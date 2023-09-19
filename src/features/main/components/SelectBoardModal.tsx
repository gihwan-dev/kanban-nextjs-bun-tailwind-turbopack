"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import React from "react";
import { useRecoilState } from "recoil";
import { navState } from "../stores";
import IconBoard from "@/assets/icon-board";
import { NavBoard } from "../types";
import IconBoardCreate from "@/assets/icon-board-create";
import ThemeSelectIcon from "@/assets/ThemeSelectIcon";

const SelectBoardModal: React.FC<{}> = () => {
  const [nav, setNav] = useRecoilState(navState);

  const onCloseHandler = () => {
    setNav(prev => ({
      ...prev,
      open: false,
    }));
  };

  const onClickHandler = (selectedBoard: NavBoard) => {
    setNav(prev => ({
      ...prev,
      selectedBoard,
    }));
  };

  return (
    <>
      {nav.open ? (
        <Modal onBackdropClick={onCloseHandler}>
          <ul
            className={
              "fixed top-16 left-1/2 -translate-x-1/2 -bg--White px-6 py-4 flex flex-col rounded-lg box-border"
            }
          >
            <header className="pb-4 -text--Medium-Grey text-xs font-bold">
              ALL BOARDS ({nav.boards.length})
            </header>
            {nav.boards.map(item => {
              return (
                <li
                  key={`SelectBoardMenuList ${item.board_id}`}
                  className={`flex flex-row items-center rounded-r-full gap-2 py-4 ${
                    item.board_id === nav.selectedBoard.board_id
                      ? "-ml-6 pl-6 -bg--Main-Purple"
                      : ""
                  }`}
                >
                  <IconBoard
                    fill={
                      item.board_id === nav.selectedBoard.board_id
                        ? "white"
                        : "#828FA3"
                    }
                  />
                  <Link
                    className={`whitespace-nowrap font-bold text-sm ${
                      item.board_id === nav.selectedBoard.board_id
                        ? "-text--White"
                        : "-text--Black"
                    }`}
                    onClick={onClickHandler.bind(null, item)}
                    href={`/main/${item.board_id}`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <button
              className={
                "flex -text--Main-Purple hover:-text--main-purple-hover text-sm font-bold gap-2 items-center py-4"
              }
            >
              <IconBoardCreate />
              <span>+Create New Board</span>
            </button>
            <footer>
              <ThemeSelectIcon onClick={() => {}} />
            </footer>
          </ul>
        </Modal>
      ) : (
        <div className="absolute"></div>
      )}
    </>
  );
};

export default SelectBoardModal;
