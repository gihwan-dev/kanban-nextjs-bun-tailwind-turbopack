import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeleteModalState = {
  id?: number;
  type?: "board" | "column" | "task" | "subtask";
  open: boolean;
};

const initialState: DeleteModalState = {
  id: undefined,
  type: undefined,
  open: false,
};

export const deleteModalSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    setDeleteModal: (
      state,
      action: PayloadAction<Pick<DeleteModalState, "id" | "type">>,
    ) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setCloseModal: state => {
      state.open = false;
    },
    setOpenModal: state => {
      state.open = true;
    },
  },
});

export const { setDeleteModal, setCloseModal, setOpenModal } =
  deleteModalSlice.actions;

export default deleteModalSlice.reducer;
