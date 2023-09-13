import SelectBoardMenuList from "@/components/main/nav/SelectBoardNavMenu/SelectBoardMenuList";
import MobileLogo from "@/svgs/MobileLogo";

export type NavBoard = {
  id: number;
  title: string;
};

export type NavBoardList = {
  boards: NavBoard[];
};

const SelectBoardNavMenu = () => {
  return (
    <nav className={"flex flex-row gap-4"}>
      <MobileLogo />
      <SelectBoardMenuList boards={[{ title: "test", id: 1 }]} />
    </nav>
  );
};

export default SelectBoardNavMenu;
