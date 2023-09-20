export const validateColumns = (columns: string[]) => {
  return columns.every(item => item.trim().length > 0);
};
