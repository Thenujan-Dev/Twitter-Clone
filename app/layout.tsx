"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import LeftSideBar from "./componenets/LeftSideBar";
import RightSideBar from "./componenets/RightSideBar";
import Wrapper from "./Provider/Wrapper";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Context } from "./context/Context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/pages/login", "/pages/register"];
  const showSidebars = !noSidebarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrapper>
          <Context>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="h-dvh w-full bg-black text-white flex">
              {showSidebars && (
                <div className="w-[15%] h-full border-r border-slate-500 p-5">
                  <LeftSideBar />
                </div>
              )}
              <div
                className={`${
                  showSidebars ? "w-[70%]" : "w-full"
                } flex justify-center p-5`}
              >
                {children}
              </div>
              {showSidebars && (
                <div className="w-[15%] h-full p-5">
                  <RightSideBar />
                </div>
              )}
            </div>
          </Context>
        </Wrapper>
      </body>
    </html>
  );
}
