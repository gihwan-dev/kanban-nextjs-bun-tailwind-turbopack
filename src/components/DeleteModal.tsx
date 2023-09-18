import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteModalState, deleteModalStateIsValid } from "@/stores";

const DeleteModal = () => {
  const [mounted, setMounted] = useState(false);

  const [deleteStateData, setDeleteStateData] =
    useRecoilState(deleteModalState);

  const deleteModalIsValid = useRecoilValue(deleteModalStateIsValid);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!deleteModalIsValid) {
    return;
  }

  const getParagraph = () => {
    switch (deleteStateData.type) {
      case "boards":
        return "This action will remove all columns and tasks and cannot be reserved.";
      default:
        return "This action cannot be reserved.";
    }
  };

  const onCloseHandler = () => {
    setDeleteStateData(prev => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };

  return mounted
    ? createPortal(
        <Modal onBackdropClick={onCloseHandler}>
          <div>
            <header>Delete this {deleteStateData.type}?</header>
            <p>
              Are you sure you want to delete the{" "}
              {`"'${deleteStateData.title}'`} {deleteStateData.type}?{" "}
              {getParagraph()}
            </p>
            <div>
              <button>Delete</button>
              <button>Cancel</button>
            </div>
          </div>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default DeleteModal;
