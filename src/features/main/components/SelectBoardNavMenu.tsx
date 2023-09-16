import SelectBoardMenuList from "./SelectBoardMenuList";
import MobileLogo from "../../../assets/MobileLogo";

const SelectBoardNavMenu = () => {
  return (
    <nav className={"flex flex-row gap-4"}>
      <MobileLogo />
      <SelectBoardMenuList />
    </nav>
  );
};

export default SelectBoardNavMenu;
