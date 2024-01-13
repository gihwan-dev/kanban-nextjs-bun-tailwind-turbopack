"use client";

import React, { useEffect, useState } from "react";

import SelectBoardNavMenu from "./SelectBoardNavMenu";

import { NavState } from "../types";

import { useRecoilState } from "recoil";
import { navState } from "../stores";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";
import { useParams, useRouter } from "next/navigation";
import EllipsisMenu from "./EllipsisMenu";
import { useGetBoards, useIsSmallScreen } from "../hooks";
import AddNewTaskModal from "./AddNewTaskModal";
import EditBoardModal from "./EditBoardModal";
import { deleteModalState } from "@/stores";

const MainHeaderNavRoot: React.FC<{}> = () => {
  const [navStateData, setNav] = useRecoilState(navState);
  const [openMenu, setOpenMenu] = useState(false);
  const [openTaskMenu, setOpenTaskMenu] = useState(false);

  const [openEditMenu, setOpenEditMenu] = useState(false);

  const isSmallScreen = useIsSmallScreen();

  const [deleteStateData, setDeleteStateData] =
    useRecoilState(deleteModalState);

  const onEditClickHandler = () => {
    setOpenMenu(false);
    setOpenEditMenu(prev => !prev);
  };

  const onDeleteClickHandler = () => {
    setDeleteStateData({
      targetId: navStateData.selectedBoard.board_id,
      isOpen: true,
      title: navStateData.selectedBoard.title,
      type: "boards",
    });
    setOpenMenu(false);
  };

  const router = useRouter();

  const { data: boards } = useGetBoards();

  const params = useParams();

  useEffect(() => {
    if (!!boards && params.id) {
      const selectedBoard = boards?.find(
        item => item.board_id == Number(params.id),
      );
      if (!selectedBoard) {
        router.push("/main");
        return;
      }

      const initialNavState: NavState = {
        open: false,
        selectedBoard: selectedBoard,
        boards,
      };
      setNav(initialNavState);
    } else if (
      !!boards &&
      boards.length >= 1 &&
      navStateData.selectedBoard.title === ""
    ) {
      const initialNavState: NavState = {
        open: false,
        selectedBoard: boards[0],
        boards,
      };
      setNav(initialNavState);
      router.push(`/main/${boards[0].board_id}`);
    }
  }, [boards]);

  const iconClickHandler = () => {
    setOpenMenu(prev => !prev);
  };

  const onClickAddNewTaskModal = () => {
    setOpenTaskMenu(prev => !prev);
  };

  return (
    <>
      <header
        className={
          "flex flex-row justify-between items-center px-4 py-4 w-full"
        }
      >
        {isSmallScreen ? <SelectBoardNavMenu /> : <div></div>}
        <div className={"flex flex-row items-center gap-4"}>
          <button
            onClick={onClickAddNewTaskModal}
            className={
              "py-2 px-4 -text--White -bg--Main-Purple rounded-full font-bold w-12 hover:-bg--main-purple-hover"
            }
          >
            +
          </button>
          <IconVerticalEllipsis
            className="cursor-pointer"
            onClick={iconClickHandler}
          />
        </div>
        {openMenu ? (
          <>
            <div
              onClick={() => setOpenMenu(false)}
              className={"absolute w-full h-full top-0 left-0"}
            />{" "}
            <EllipsisMenu
              onEditClickHandler={onEditClickHandler}
              onDeleteClickHandler={onDeleteClickHandler}
            />
          </>
        ) : null}
        {openTaskMenu ? (
          <AddNewTaskModal onClose={onClickAddNewTaskModal} />
        ) : null}
      </header>
      {openEditMenu && <EditBoardModal onClose={onEditClickHandler} />}
    </>
  );
};

export default MainHeaderNavRoot;
