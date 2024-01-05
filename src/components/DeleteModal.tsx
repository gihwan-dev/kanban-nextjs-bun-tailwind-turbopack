import React from "react";
import Modal from "@/components/Modal";
import { useRecoilState } from "recoil";
import { deleteModalState } from "@/stores";
import { useDelete } from "@/hooks";

import LoadingModal from "@/components/LoadingModal";
import SuccessModal from "@/components/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";

const DeleteModal = () => {
  const [deleteStateData, setDeleteStateData] =
    useRecoilState(deleteModalState);

  const { mutate, isSuccess, isPending, isError } = useDelete();

  const queryClient = useQueryClient();

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

  const onDeleteHandler = () => {
    mutate(
      {
        targetId: deleteStateData.targetId as number,
        type: deleteStateData.type as
          | "tasks"
          | "columns"
          | "boards"
          | "subtasks",
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: [deleteStateData.type],
          });
        },
      },
    );
  };

  if (isPending || isError) {
    return <LoadingModal />;
  }

  if (isSuccess) {
    setTimeout(() => {
      setDeleteStateData(prev => {
        return {
          ...prev,
          isOpen: false,
        };
      });
    }, 1500);
    return <SuccessModal />;
  }

  return (
    <Modal onBackdropClick={onCloseHandler}>
      <div
        className={
          "flex flex-col gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 -bg--White max-w-sm p-6 rounded-lg"
        }
      >
        <header className={"-text--Red font-bold text-lg"}>
          Delete this {deleteStateData.type}?
        </header>
        <p className={"-text--Medium-Grey text-sm font-medium"}>
          Are you sure you want to delete the {`"'${deleteStateData.title}'`}{" "}
          {deleteStateData.type}? {getParagraph()}
        </p>
        <div className={"flex flex-col gap-4"}>
          <button
            onClick={onDeleteHandler}
            className={
              "-bg--Red -text--White font-bold rounded-full text-sm py-2 hover:-bg--red-hover"
            }
          >
            Delete
          </button>
          <button
            onClick={onCloseHandler}
            className={
              "-bg--Main-Purple bg-opacity-10 rounded-full text-sm py-2 -text--Main-Purple font-bold hover:-bg--White"
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
