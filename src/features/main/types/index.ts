import { Board } from "@prisma/client";

export type NavBoard = Pick<Board, "board_id" | "title">;

export type NavState = {
  boards: NavBoard[];
  selectedBoard: NavBoard;
  open: boolean;
};
