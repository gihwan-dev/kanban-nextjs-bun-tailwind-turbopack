import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import MySessionProvider from "@/services/session-provider";
import { getServerSession } from "next-auth";
import MyQueryProvider from "@/services/react-query-provider";
import RecoilProvider from "@/services/recoil-provider";
import { option } from "@/app/api/auth/[...nextauth]/route";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(option);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <RecoilProvider>
          <MyQueryProvider>
            <MySessionProvider session={session}>
              {children}
              <div id={"modal"}></div>
            </MySessionProvider>
          </MyQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;
