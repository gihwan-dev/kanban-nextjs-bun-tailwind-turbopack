import React from "react";

import IconDownArrow from "../../../assets/IconDownArrow";
import { useRecoilState } from "recoil";
import { navState } from "../stores";

const SelectBoardMenuList: React.FC = () => {
  const [nav, setNav] = useRecoilState(navState);

  const onClickHandler = () => {
    setNav(prev => ({
      ...prev,
      open: !prev.open,
    }));
  };

  return (
    <div
      onClick={onClickHandler}
      className={`flex flex-row gap-2 items-center cursor-pointer`}
    >
      <span className="-text--Black font-bold text-lg">
        {nav.selectedBoard.title}
      </span>
      <div
        className={`${
          nav.open ? "rotate-180" : ""
        } flex justify-center items-center`}
      >
        <IconDownArrow />
      </div>
    </div>
  );
};

export default SelectBoardMenuList;
