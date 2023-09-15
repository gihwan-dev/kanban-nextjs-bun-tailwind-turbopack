"use client";

import React, { useEffect } from "react";

import SelectBoardNavMenu from "./SelectBoardNavMenu";

import { NavBoard, NavState } from "../../types";

import { useRecoilState } from "recoil";
import { navState } from "../../stores";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";

const MainHeaderNavRoot: React.FC<{
  boards: NavBoard[];
}> = ({ boards }) => {
  const [_, setNav] = useRecoilState(navState);

  useEffect(() => {
    if (boards.length >= 1) {
      const initialNavState: NavState = {
        open: false,
        selectedBoard: boards[0],
        boards,
      };
      setNav(initialNavState);
    }
  }, []);

  return (
    <header className={"flex flex-row justify-between px-4 py-4 w-full"}>
      <SelectBoardNavMenu />
      <IconVerticalEllipsis className="cursor-pointer" onClick={() => {}} />
    </header>
  );
};

export default MainHeaderNavRoot;
