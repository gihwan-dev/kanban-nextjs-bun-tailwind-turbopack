"use client";

import React from "react";

const Modal: React.FC<{
  children: React.ReactNode;
  onBackdropClick: () => void;
}> = ({ children, onBackdropClick }) => {
  return (
    <React.Fragment>
      <div
        onClick={onBackdropClick}
        className="absolute top-0 left-0 w-screen h-screen -bg--Medium-Grey opacity-30"
      />

      <div
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
