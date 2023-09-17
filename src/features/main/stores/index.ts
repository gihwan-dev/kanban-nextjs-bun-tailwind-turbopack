import { atom } from "recoil";
import { NavState } from "../types";
import { Column } from "@prisma/client";

const initialNavState: NavState = {
  boards: [],
  selectedBoard: { title: "", board_id: 0 },
  open: false,
};

export const navState = atom({
  key: "navState",
  default: initialNavState,
});

const initialColumState: Pick<Column, "column_id" | "title" | "board_id">[] =
  [];

export const columnsState = atom({
  key: "columnsState",
  default: initialColumState,
});
