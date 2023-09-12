"use client";

import React from "react";

const Modal: React.FC<{
  children: React.ReactNode;
  onBackdropClick: () => void;
  zIndex?: number;
}> = ({ children, onBackdropClick, zIndex }) => {
  return (
    <React.Fragment>
      <div
        onClick={onBackdropClick}
        className="absolute top-0 left-0 w-screen h-screen -bg--Medium-Grey opacity-30"
      />

      {children}
    </React.Fragment>
  );
};

export default Modal;
