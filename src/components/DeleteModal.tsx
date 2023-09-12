"use client";

import { SERVER_URL } from "@/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Modal from "../UI/Modal";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux-hooks";
import { setCloseModal } from "@/utils/redux/slices/deleteModal-slice";

const deleteAxios = (id: number, type: string) => {
  return axios.delete(`${SERVER_URL}/${type}/${id}`);
};

const DeleteModal: React.FC = () => {
  const deleteModalState = useAppSelector(state => state.delete);
  const id = deleteModalState.id as number;
  const type = deleteModalState.type as "board" | "column" | "task";
  const open = deleteModalState.open;

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete", type, id],
    mutationFn: () => deleteAxios(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      dispatch(setCloseModal());
      window.alert(`${type} deleted!`);
    },
  });

  const onClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      {open ? (
        <Modal
          onBackdropClick={() => {
            dispatch(setCloseModal());
          }}
        >
          <form
            className="flex flex-col gap-6 -bg--White w-screen max-w-lg p-8 rounded-md"
            onSubmit={onClickHandler}
          >
            <header className="-text--Red font-bold">
              Delete this {type}?
            </header>
            <p className="-text--Medium-Grey font-normal">
              Are you sure want to delete the {`'${type}'`}? This action will
              remove all things inside and cannot be reversed.
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
                  dispatch(setCloseModal());
                }}
              >
                Cancel
              </button>
            </footer>
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteModal;
