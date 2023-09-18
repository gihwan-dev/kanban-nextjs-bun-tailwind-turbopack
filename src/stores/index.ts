import { DeleteModalState } from "@/types/delete-modal-type";
import { atom, selector } from "recoil";

const deleteModalInitialState: DeleteModalState = {
  isOpen: false,
};

export const deleteModalState = atom({
  key: "deleteState",
  default: deleteModalInitialState,
});

export const deleteModalStateIsValid = selector({
  key: "deleteStateIsValid",
  get: ({ get }) => {
    const deleteState = get(deleteModalState);

    return (
      deleteState.title !== undefined &&
      deleteState.type !== undefined &&
      deleteState.targetId !== undefined
    );
  },
});
