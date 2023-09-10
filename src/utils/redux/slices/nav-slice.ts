import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface NavState {
  id: number;
}

const initialState: NavState = {
  id: 0,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNavState: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setNavState } = navSlice.actions;

export default navSlice.reducer;
