"use client";

import { SERVER_URL } from "@/const";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Modal from "./Modal";

const deleteAxios = (id: number, type: string) => {
  return axios.delete(`${SERVER_URL}/${type}/${id}`);
};

const DeleteModal: React.FC<{
  id: number;
  type: "board" | "column" | "task" | "subtask";
  onClose: () => void;
}> = ({ id, type, onClose }) => {
  const { mutate } = useMutation({
    mutationKey: ["delete", type, id],
    mutationFn: () => deleteAxios(id, type),
    onSuccess: () => {
      window.alert(`${type} deleted!`);
      onClose();
    },
  });

  const onClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Modal onBackdropClick={() => onClose()}>
      <form
        className="flex flex-col gap-6 -bg--White -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg p-8 rounded-md"
        onSubmit={onClickHandler}
      >
        <header className="-text--Red font-bold">Delete this {type}?</header>
        <p className="-text--Medium-Grey font-normal">
          Are you sure want to delete the {`'${type}'`}? This action will remove
          all things inside and cannot be reversed.
        </p>
        <footer className="w-full flex flex-row gap-4 justify-between">
          <button
            className="flex-1  -bg--Red -text--White font-bold rounded-3xl py-2 hover:-bg--red-hover"
            type="submit"
          >
            Delete
          </button>
          <button
            className="flex-1 -bg--main-purple-hover bg-opacity-25 -text--Main-Purple hover:bg-opacity-50 font-bold rounded-3xl"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </footer>
      </form>
    </Modal>
  );
};

export default DeleteModal;
