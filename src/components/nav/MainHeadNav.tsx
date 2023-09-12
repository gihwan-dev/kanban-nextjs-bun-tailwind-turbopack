"use client";

import React, {useState} from "react";
import EclipsSvg from "./SvgComponent/EclipsSvg";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignupForm";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Board} from "@prisma/client";
import {useAppSelector} from "@/utils/hooks/redux-hooks";
import Modal from "@/UI/Modal";
import AddNewTaskModal from "./AddNewTaskModal";
import SettingModal from "@/components/SettingModal";

const MainHeadNav: React.FC<{
  data: Pick<Board, "board_id" | "title">[];
}> = ({ data }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAddNewTaskModal, setOpenAddNewTaskModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const selectedBoardId = useAppSelector((state) => state.nav.id);

  const session = useSession();

  const router = useRouter();

  const openLoginModalHandler = () => {
    setOpenLoginModal(true);
  };

  const closeLoginModalHandler = () => {
    setOpenLoginModal(false);
  };

  const openSignUpModalHandler = () => {
    setOpenSignUpModal(true);
  };

  const closeSignUpModalHandler = () => {
    setOpenSignUpModal(false);
  };

  const openMenuHandler = () => {
    setOpenMenu(true);
  };

  const closeMenuHandler = () => {
    setOpenMenu(false);
  };

  const closeSettingModalHandler = () => {
    setOpenSettingsModal(false);
  };

  const getBoardTitle = () => {
    const board = data.find((item) => item.board_id === selectedBoardId);
    if (!board) {
      return "";
    }
    return board.title;
  };

  return (
    <React.Fragment>
      <section
        className={`w-full px-8 py-4 -border--light-grey-light-bg border-solid border flex flex-row justify-between items-center box-border`}
      >
        <h2 className={`text-2xl font-bold`}>{getBoardTitle()}</h2>
        <div className={`flex flex-row items-center gap-6`}>
          <button
            onClick={() => setOpenAddNewTaskModal(true)}
            className="px-6 py-4 -bg--Main-Purple rounded-3xl -text--White font-bold hover:-bg--main-purple-hover box-border"
          >
            +Add New Task
          </button>
          <div>
            <div onClick={openMenuHandler}>
              <EclipsSvg className={"cursor-pointer"} />
            </div>
            {openMenu ? (
              <Modal onBackdropClick={() => setOpenMenu(false)}>
                <ul
                  id="menu"
                  className="w-72 absolute px-4 py-4 -bg--White font-bold flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 rounded-md"
                >
                  <header>Menu</header>
                  <hr className="w-full" />
                  {session.status !== "authenticated" ? (
                    <>
                      <li
                        onClick={() => {
                          closeMenuHandler();
                          openLoginModalHandler();
                        }}
                        className="cursor-pointer -text--Medium-Grey"
                      >
                        Login
                      </li>
                      <li
                        onClick={() => {
                          closeMenuHandler();
                          openSignUpModalHandler();
                        }}
                        className="cursor-pointer whitespace-nowrap -text--Medium-Grey"
                      >
                        Sign Up
                      </li>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={async () => {
                          closeMenuHandler();
                          await signOut();
                          router.refresh();
                        }}
                        className="cursor-pointer whitespace-nowrap -text--Medium-Grey"
                      >
                        Sign out
                      </button>
                      <hr className="w-full" />
                      <button
                        onClick={() => {
                          closeMenuHandler();
                          setOpenSettingsModal(true);
                        }}
                        className="cursor-pointer whitespace-nowrap -text--Medium-Grey"
                      >
                        Settings
                      </button>
                    </>
                  )}
                  <hr className="w-full" />
                  <button
                    onClick={() => setOpenMenu(false)}
                    className="-text--Red"
                  >
                    close
                  </button>
                </ul>
              </Modal>
            ) : null}
          </div>
        </div>
      </section>
      {openLoginModal ? (
        <LoginForm
          onClose={() => {
            closeMenuHandler();
            closeLoginModalHandler();
          }}
        />
      ) : null}
      {openSignUpModal ? (
        <SignUpForm
          onClose={() => {
            closeMenuHandler();
            closeSignUpModalHandler();
          }}
        />
      ) : null}
      {openAddNewTaskModal ? (
        <AddNewTaskModal onClose={() => setOpenAddNewTaskModal(false)} />
      ) : null}
      {openSettingsModal ? (
        <SettingModal onClose={closeSettingModalHandler} />
      ) : null}
    </React.Fragment>
  );
};

export default MainHeadNav;
