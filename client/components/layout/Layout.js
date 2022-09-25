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
      <main className="px-28 text-colorBlack text-sm">{children}</main>
    </>
  );
};

export default Layout;
