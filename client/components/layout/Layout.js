import React from "react";
import { useRouter } from "next/router";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const router = useRouter();

  const showHeader =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/signup/verify"
      ? false
      : true;

  return (
    <>
      {showHeader && <Navbar />}
      <main className="px-44 text-colorBlack text-sm min-h- pb-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
