"use client";

import { Spinner } from "@nextui-org/react";

const HomeIdLoadingPage = () => {
  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <Spinner size={"lg"} />
    </div>
  );
};

export default HomeIdLoadingPage;
