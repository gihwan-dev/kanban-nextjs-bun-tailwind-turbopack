import { DeleteModalState } from "@/types/delete-modal-type";
import { atom } from "recoil";

const deleteModalInitialState: DeleteModalState = {
  isOpen: false,
};

export const deleteModalState = atom({
  key: "deleteState",
  default: deleteModalInitialState,
});
