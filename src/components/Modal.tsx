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
        className="absolute top-0 left-0 w-full h-full -bg--Medium-Grey opacity-30"
      />
      {children}
    </React.Fragment>
  );
};

export default Modal;
