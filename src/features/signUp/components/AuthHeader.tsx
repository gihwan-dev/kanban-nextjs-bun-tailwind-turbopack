"use client";

import LogoDark from "@/assets/logo-dark";

const AuthHeader = () => {
  return (
    <header className="flex flex-col gap-4 -text--Main-Purple">
      <LogoDark />
      <h1 className="text-center font-bold text-xl">{"Sign up"}</h1>
    </header>
  );
};

export default AuthHeader;
