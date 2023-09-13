import SelectBoardNavMenu from "@/components/main/nav/SelectBoardNavMenu/SelectBoardNavMenu";

const MainHeaderNavRoot = () => {
  return (
    <header className={"flex flex-row justify-between px-2 py-4 w-full"}>
      <SelectBoardNavMenu />
    </header>
  );
};

export default MainHeaderNavRoot;
