"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SuccessModal = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount
    ? createPortal(
        <Modal onBackdropClick={() => {}}>
          <div
            className={
              "fixed w-screen h-screen flex justify-center items-center top-0 left-0"
            }
          >
            <h1 className={"font-bold text-2xl -text--White"}>Success!</h1>
          </div>
        </Modal>,
        document.getElementById("modal") as HTMLElement,
      )
    : null;
};

export default SuccessModal;
