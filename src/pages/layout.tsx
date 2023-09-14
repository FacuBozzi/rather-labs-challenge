import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Inter } from "next/font/google";
import { LayoutProps } from "@/types/Layout.";

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-bgGray ${inter.className}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
