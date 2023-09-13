"use client";

import React, { useState } from "react";

import { NavBoardList } from "@/components/main/nav/SelectBoardNavMenu/SelectBoardNavMenu";
import IconDownArrow from "@/svgs/IconDownArrow";

const SelectBoardMenuList: React.FC<NavBoardList> = ({ boards }) => {
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);

  const onClickHandler = () => {
    setOpenMenu(prev => !prev);
  };

  return (
    <div>
      <label
        onClick={onClickHandler}
        className={`flex flex-row gap-2 items-center`}
      >
        <span className={"w-fit h-fit"}>{selectedBoard.title}</span>
        <div className={openMenu ? "rotate-180" : ""}>
          <IconDownArrow />
        </div>
      </label>
    </div>
  );
};

export default SelectBoardMenuList;
