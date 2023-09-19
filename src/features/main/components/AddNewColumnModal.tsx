import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { navState } from "../stores";
import { createPortal } from "react-dom";

const AddNewColumnModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const navStateData = useRecoilValue(navState);

  const [inputList, setInputList] = useState<string[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <Modal onBackdropClick={onClose}>
          <form
            className={
              "absolute w-72 -bg--White top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }
          >
            <header>{navStateData.selectedBoard.title}</header>
            <ul>
              {inputList.map((_, index) => {
                return <input key={`${index}AddNewColumnModalInput`} />;
              })}
              <button type="button">+ Add New Column</button>
            </ul>
            <button>Save Changes</button>
          </form>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default AddNewColumnModal;
