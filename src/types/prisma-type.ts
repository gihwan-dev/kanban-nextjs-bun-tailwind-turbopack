import { Column } from "@prisma/client";

export type RootColumn = Pick<Column, "column_id" | "title" | "board_id">;
