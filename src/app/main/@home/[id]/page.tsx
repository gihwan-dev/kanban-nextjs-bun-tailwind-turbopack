"use client";

import {
  AddColumnButton,
  ColumnRoot,
  EmptyColumn,
  SelectBoardModal,
  useGetColumns,
} from "@/features/main";
import { useParams } from "next/navigation";

const IdMainPage = () => {
  const params = useParams();
  const { data: columns } = useGetColumns(Number(params.id));
  return (
    <main className="-bg--light-grey-light-bg h-full w-full overflow-x-auto overflow-y-hidden relative px-4 py-6 flex flex-row gap-6">
      {!columns || columns.length === 0 ? (
        <EmptyColumn />
      ) : (
        <>
          <ColumnRoot columns={columns} />
          <AddColumnButton />
        </>
      )}
      <SelectBoardModal />
    </main>
  );
};

export default IdMainPage;
