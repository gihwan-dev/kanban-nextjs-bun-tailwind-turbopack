import { atom } from "recoil";
import { NavState } from "../types";

const initialNavState: NavState = {
  boards: [],
  selectedBoard: { title: "", board_id: 0 },
  open: false,
};

export const navState = atom({
  key: "navState",
  default: initialNavState,
});
