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
    setDeleteModal: (state, action: PayloadAction<DeleteModalState>) => {
      state = action.payload;
    },
    setCloseModal: state => {
      state.open = false;
    },
  },
});

export const { setDeleteModal, setCloseModal } = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
