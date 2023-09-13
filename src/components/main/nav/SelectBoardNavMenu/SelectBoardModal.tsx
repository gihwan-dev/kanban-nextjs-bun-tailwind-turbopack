import Link from "next/link";
import Modal from "@/UI/Modal";
import React from "react";
import { NavBoard } from "@/components/main/nav/SelectBoardNavMenu/SelectBoardNavMenu";

const SelectBoardModal: React.FC<{
  data: NavBoard[];
  onClick: () => void;
}> = ({ data, onClick }) => {
  return (
    <Modal onBackdropClick={onClick}>
      <ul className={"absolute w-screen max-w-lg -bg--White"}>
        <header>ALL BOARDS ({data.length})</header>
        {data.map(item => {
          return (
            <li key={`SelectBoardMenuList ${item.id}`}>
              <Link href={`main/${item.id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};

export default SelectBoardModal;
