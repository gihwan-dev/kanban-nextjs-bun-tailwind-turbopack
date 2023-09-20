"use client";

import React, { useEffect, useState } from "react";

import SelectBoardNavMenu from "./SelectBoardNavMenu";

import { NavState } from "../types";

import { useRecoilState } from "recoil";
import { navState } from "../stores";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";
import { useRouter } from "next/navigation";
import EllipsisMenu from "./EllipsisMenu";
import { useGetBoards } from "../hooks";

const MainHeaderNavRoot: React.FC<{}> = () => {
  const [navStateData, setNav] = useRecoilState(navState);
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  const { data: boards } = useGetBoards();

  useEffect(() => {
    if (
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

  return (
    <>
      <header className={"flex flex-row justify-between px-4 py-4 w-full"}>
        <SelectBoardNavMenu />
        <IconVerticalEllipsis
          className="cursor-pointer"
          onClick={iconClickHandler}
        />
        {openMenu ? <EllipsisMenu /> : null}
      </header>
    </>
  );
};

export default MainHeaderNavRoot;
