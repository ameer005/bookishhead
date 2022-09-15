import { useRouter } from "next/router";
import Navbar from "./navBar/navbar";

const Layout = ({ children }) => {
  const router = useRouter();
  const showNavbar =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/verify"
      ? false
      : true;

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="bg-colorGray2">{children}</main>
    </>
  );
};

export default Layout;
