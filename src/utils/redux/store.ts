import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./slices/nav-slice";
import DeleteModalSlice from "./slices/deleteModal-slice";

export const store = configureStore({
  reducer: {
    nav: NavSlice,
    delete: DeleteModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
