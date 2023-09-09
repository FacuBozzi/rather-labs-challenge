import React, { ReactNode } from "react";
import Navbar from "../Navbar/page";
import { Inter } from "next/font/google";
// import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

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
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
