"use client";

import React from "react";

const Modal: React.FC<{
  children: React.ReactNode;
  onBackdropClick: () => void;
}> = ({ children, onBackdropClick }) => {
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "black",
          opacity: 0.5,
        }}
        onClick={onBackdropClick}
        className="absolute top-0 left-0 w-full h-full"
      />
      {children}
    </React.Fragment>
  );
};

export default Modal;
