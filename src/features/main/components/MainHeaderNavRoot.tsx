"use client";

import React, { useEffect, useState } from "react";

import SelectBoardNavMenu from "./SelectBoardNavMenu";

import { NavState } from "../types";

import { useRecoilState } from "recoil";
import { navState } from "../stores";
import IconVerticalEllipsis from "@/assets/icon-vertical-ellipsis";
import { useParams, useRouter } from "next/navigation";
import EllipsisMenu from "./EllipsisMenu";
import { useGetBoards } from "../hooks";

const MainHeaderNavRoot: React.FC<{}> = () => {
  const [navStateData, setNav] = useRecoilState(navState);
  const [openMenu, setOpenMenu] = useState(false);

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

  return (
    <>
      <header className={"flex flex-row justify-between px-4 py-4 w-full"}>
        <SelectBoardNavMenu />
        <div className={"flex flex-row items-center gap-4"}>
          <button
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
            <EllipsisMenu />
          </>
        ) : null}
      </header>
    </>
  );
};

export default MainHeaderNavRoot;
