import SelectBoardMenuList from "./SelectBoardMenuList";
import MobileLogo from "../../../assets/MobileLogo";
import LogoDark from "@/assets/logo-dark";

const SelectBoardNavMenu = () => {
  return (
    <nav className={"flex flex-row gap-4 items-center"}>
      <div className="md:hidden">
        <MobileLogo />
      </div>
      <div className={"hidden md:inline"}>
        <LogoDark />
      </div>
      <SelectBoardMenuList />
    </nav>
  );
};

export default SelectBoardNavMenu;
