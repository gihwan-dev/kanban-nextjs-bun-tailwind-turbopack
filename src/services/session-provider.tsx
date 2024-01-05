"use client";

import { SessionProvider } from "next-auth/react";

const MySessionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default MySessionProvider;
