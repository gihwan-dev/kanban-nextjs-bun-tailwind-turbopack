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
  title: string;
  onClose: () => void;
}> = ({ id, type, title, onClose }) => {
  const { mutate } = useMutation({
    mutationKey: ["delete", type, id],
    mutationFn: () => deleteAxios(id, type),
  });

  const onClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Modal onBackdropClick={() => onClose()}>
      <form onSubmit={onClickHandler}>
        <header>Delete this {type}?</header>
        <p>
          Are you sure want to delete the {`'${title}'`}? This action will
          remove all things inside and cannot be reversed.
        </p>
        <footer>
          <button type="submit">Delete</button>
          <button
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
