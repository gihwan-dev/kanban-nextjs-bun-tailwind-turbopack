import InputWithLabel from "@/components/InputWithLabel";
import LabelWithMultipleInput from "@/components/LabelWithMultipleIInput";
import Modal from "@/components/Modal";
import React, { useState } from "react";

const AddNewTaskModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [inputList, setInputList] = useState([
    Math.random().toString().slice(2),
  ]);

  const onClickDeleteIconHandler = (targetIndex: number) => {
    if (inputList.length === 1) {
      return;
    }
    setInputList(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const onClickAddBtnHandler = () => {
    setInputList(prev => {
      return [...prev, Math.random().toString().slice(2)];
    });
  };

  return (
    <Modal onBackdropClick={onClose}>
      <form className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-6 -bg--White rounded-lg gap-6">
        <header className="-text--Black text-lg font-bold">Add New Task</header>
        <InputWithLabel
          placeholder="e.g. Take coffee break"
          labelTitle="Title"
        />
        <InputWithLabel
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          labelTitle="Description"
        />
        <LabelWithMultipleInput
          labelTitle="SubTasks"
          placeholder=""
          inputList={inputList}
          onClickDelete={onClickDeleteIconHandler}
          onClickAdd={onClickAddBtnHandler}
        />
      </form>
    </Modal>
  );
};

export default AddNewTaskModal;
