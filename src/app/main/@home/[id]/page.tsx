"use client";

import {
  AddColumnButton,
  ColumnRoot,
  EmptyColumn,
  SelectBoardModal,
  useGetColumns,
} from "@/features/main";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { deleteModalState } from "@/stores";
import DeleteModal from "@/components/DeleteModal";

const IdMainPage = () => {
  const params = useParams();
  const deleteModal = useRecoilValue(deleteModalState);
  const { data: columns } = useGetColumns(Number(params.id));
  return (
    <>
      <main className="-bg--light-grey-light-bg h-full w-full overflow-x-auto overflow-y-hidden px-4 py-6 flex flex-row gap-6">
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
      {deleteModal.isOpen && <DeleteModal />}
    </>
  );
};

export default IdMainPage;
