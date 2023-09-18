export type DeleteModalState = {
  isOpen: boolean;
  type?: "tasks" | "subtasks" | "boards" | "columns";
  targetId?: number;
  title?: string;
};
