"use client";

import LogoDark from "@/assets/logo-dark";
import { getCurrentFormTitle } from "../stores";
import { useRecoilValue } from "recoil";

const AuthHeader = () => {
  const title = useRecoilValue(getCurrentFormTitle);
  return (
    <header className="flex flex-col gap-4 -text--Main-Purple">
      <LogoDark />
      <h1 className="text-center font-bold text-xl">{title}</h1>
    </header>
  );
};

export default AuthHeader;
