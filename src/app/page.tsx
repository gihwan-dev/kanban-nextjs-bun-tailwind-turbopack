"use client";

import BodyRoot from "@/components/body/BodyRoot";
import { useAppSelector } from "@/utils/hooks/redux-hooks";

export default function Home() {
  const open = useAppSelector(state => state.delete.open);
  return (
    <main
      className={`w-full h-full -bg--light-grey-light-bg -border-b--lines-light pt-6 px-6 pb-12 flex flex-row overflow-x-scroll gap-6 box-border`}
    >
      <BodyRoot />
    </main>
  );
}
