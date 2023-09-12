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
        style={{
          zIndex: zIndex ? zIndex : 10,
        }}
        onClick={onBackdropClick}
        className="absolute top-0 left-0 w-screen h-screen -bg--Medium-Grey opacity-30"
      />
      <div
        style={{
          zIndex: zIndex ? zIndex + 1 : 11,
        }}
        className="absolute w-full h-full top-1/2 left-1/2"
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
