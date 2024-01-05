import React from "react";
import type { Metadata } from "next";

import { MainHeaderNavRoot } from "@/features/main";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const MainPage: React.FC<{
  home: React.ReactNode;
  unAuth: React.ReactNode;
}> = async ({ home, unAuth }) => {
  const session = await getServerSession();

  console.log(session);

  return (
    <div className={"flex flex-col overflow-hidden w-screen h-screen"}>
      <MainHeaderNavRoot />
      {session ? home : unAuth}
    </div>
  );
};

export default MainPage;
