import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./slices/nav-slice";

export const store = configureStore({
  reducer: {
    nav: NavSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
