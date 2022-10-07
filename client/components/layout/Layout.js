import React from "react";
import useStore from "../../store/useStore";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Toast from "../ui/Toast";

const Layout = ({ children }) => {
  const showToastModal = useStore((state) => state.showToastModal);
  const router = useRouter();

  const showHeader =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/signup/verify" ||
    router.pathname.startsWith("/resetpassword")
      ? false
      : true;

  return (
    <>
      {showHeader && <Navbar />}
      <main className="px-44 text-colorBlack text-sm min-h- pb-8">
        {children}
      </main>
      {showToastModal && <Toast />}
    </>
  );
};

export default Layout;
