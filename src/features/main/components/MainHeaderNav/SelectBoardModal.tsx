"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import React from "react";
import { useRecoilState } from "recoil";
import { navState } from "../../stores";
import IconBoard from "@/assets/icon-board";

const SelectBoardModal: React.FC<{}> = () => {
  const [nav, setNav] = useRecoilState(navState);

  const onCloseHandler = () => {
    setNav(prev => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      {nav.open ? (
        <Modal onBackdropClick={onCloseHandler}>
          <ul
            className={
              "absolute top-6 left-1/2 -translate-x-1/2 max-w-xs -bg--White px-6 py-4 flex flex-col rounded-lg w-64"
            }
          >
            <header className="pb-4">ALL BOARDS ({nav.boards.length})</header>
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
                    className="whitespace-nowrap"
                    href={`main/${item.board_id}`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <button>Create New Board</button>
          </ul>
        </Modal>
      ) : (
        <div className="absolute"></div>
      )}
    </>
  );
};

export default SelectBoardModal;
