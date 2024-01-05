import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import MySessionProvider from "@/services/session-provider";
import MyQueryProvider from "@/services/react-query-provider";
import RecoilProvider from "@/services/recoil-provider";
import MyNextUIProvider from "@/services/nextui-provider";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <RecoilProvider>
          <MyQueryProvider>
            <MySessionProvider>
              <MyNextUIProvider>
                <div id={"modal"}></div>
                {children}
              </MyNextUIProvider>
            </MySessionProvider>
          </MyQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;
