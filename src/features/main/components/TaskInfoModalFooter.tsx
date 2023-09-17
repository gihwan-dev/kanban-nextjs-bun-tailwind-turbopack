import { useRecoilValue } from "recoil";
import { columnsState } from "../stores";

const TaskInfoModalFooter = () => {
  const columns = useRecoilValue(columnsState);
  return (
    <footer className={"flex flex-col gap-2"}>
      <h3 className={"text-sm font-bold -text--Medium-Grey"}>Current Status</h3>
      <label
        id={"footer selector"}
        className={"w-full px-4 py-2 border -border-l--lines-light rounded-md"}
      >
        <select
          id={`footer selector`}
          className={
            "border-none w-full active:outline-none focus:outline-none"
          }
        >
          {columns.map(item => {
            return (
              <option
                value={item.column_id}
                key={`${item.column_id}${item.board_id}modal footer`}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </label>
    </footer>
  );
};

export default TaskInfoModalFooter;
