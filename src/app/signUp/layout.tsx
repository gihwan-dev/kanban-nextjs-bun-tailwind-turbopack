import React from "react";

const LoginLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};
export default LoginLayout;
