import {
  AddColumnButton,
  ColumnRoot,
  EmptyColumn,
  SelectBoardModal,
} from "@/features/main";
import { getServerSession } from "next-auth";
import { option } from "@/app/api/auth/[...nextauth]/route";
import { Params } from "@/types/params";
import { getColumnService } from "@/services/prisma-column-service";

const IdMainPage = async ({ params }: Params) => {
  const session = await getServerSession(option);
  const columns = await getColumnService(session, Number(params.id));
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
