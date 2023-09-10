"use client";

import KanBanLogo from "@/public/assets/logo-dark.svg";
import Image from "next/image";

import HideIcon from "@/public/assets/icon-hide-sidebar.svg";

import SideNavItem from "./SideNavItem/SideNavItem";
import ShowIcon from "@/public/assets/icon-show-sidebar.svg";

import SideNavLength from "./SideNavLength/SideNavLength";
import { Board } from "prisma/prisma-client";
import { useState } from "react";
import SideNavTheme from "./SideNavTheme";

const MainSideNav: React.FC<{
  data: Pick<Board, "title" | "board_id">[];
}> = ({ data }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      {showSideBar ? (
        <section
          className={`h-full flex flex-col flex-shrink-0 justify-between pt-8 pb-12 w-72 pr-6`}
        >
          <div className={`flex flex-col gap-12`}>
            <Image
              className={`pl-8`}
              src={KanBanLogo}
              alt="KanBan Logo"
            />
            <ul>
              <SideNavLength length={data.length} />
              <SideNavItem data={data} />
            </ul>
          </div>
          <div className={`w-full pl-6`}>
            <div className={`flex flex-col gap-4`}>
              <SideNavTheme />
              <div
                onClick={() => setShowSideBar(false)}
                className={`flex flex-row items-center gap-4 -text--Medium-Grey font-bold text-base pl-2 cursor-pointer`}
              >
                <Image
                  src={HideIcon}
                  alt="hide icon"
                />
                <span>Hide Sidebar</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div
          onClick={() => setShowSideBar(true)}
          className="absolute bottom-12 -bg--Main-Purple w-14 h-12 flex items-center justify-center rounded-r-full cursor-pointer"
        >
          <Image
            src={ShowIcon}
            alt="show icon"
          />
        </div>
      )}
    </>
  );
};

export default MainSideNav;
