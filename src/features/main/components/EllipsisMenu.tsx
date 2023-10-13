"use client";

import { signOut, useSession } from "next-auth/react";

const buttonClassName = "text-sm";

const EllipsisMenu: React.FC<{
  onEditClickHandler: () => void;
  onDeleteClickHandler: () => void;
}> = ({ onEditClickHandler, onDeleteClickHandler }) => {
  const session = useSession();

  return (
    <ul
      className={
        "absolute p-4 flex flex-col gap-4 rounded-lg top-12 right-4 z-10 -bg--White"
      }
    >
      {session.status === "authenticated" ? (
        <>
          <button
            onClick={onEditClickHandler}
            className={buttonClassName + " -text--Medium-Grey"}
          >
            Edit Board
          </button>
          <button
            onClick={onDeleteClickHandler}
            className={buttonClassName + " -text--Red"}
          >
            Delete Board
          </button>
          <button
            className={buttonClassName + " -text--Red font-bold"}
            onClick={() =>
              signOut({
                redirect: true,
              })
            }
          >
            Sign out
          </button>
        </>
      ) : null}
    </ul>
  );
};
export default EllipsisMenu;
