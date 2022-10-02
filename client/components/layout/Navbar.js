import { useState, useEffect } from "react";
import Link from "next/link";
import useToggle from "../../hooks/useToggle";
import useStore from "../../store/useStore";

import Logo from "../../components/ui/Logo";
import Avatar from "../ui/Avatar";
import SearchBar from "../ui/SearchBar";
import CaretDropdown from "../ui/CaretDropdown";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const [isUserLoggedin, setUserLoggedin] = useState(false);
  const { state: profileDropdown, toggle: toggleProfileDropdown } = useToggle();

  useEffect(() => {
    setUserLoggedin(user ? true : false);
  }, []);

  const loggedIn = () => {
    if (isUserLoggedin) {
      return (
        <div
          onClick={toggleProfileDropdown}
          className="flex gap-2 items-center cursor-pointer text-colorGray3 hover:text-colorPrimary ut-animation"
        >
          <Avatar />
          {/* <div className="flex gap-1 items-center ">
            <div className="text-sm font-semibold ">Ameer</div>
            <CaretDropdown isOpen={profileDropdown} />
          </div> */}
        </div>
      );
    } else {
      return (
        <>
          <Link href={"/login"}>
            <a className="py-2 w-[6rem] text-center rounded-md font-bold bg-colorPrimary hover:bg-colorPrimaryLight text-colorWhite text-sm ut-animation red-shadow">
              Login
            </a>
          </Link>
          {/* <Link href={"/signup"}>
            <a className="py-2  w-[6rem] text-center rounded-md font-medium bg-colorPrimary text-colorWhite text-sm ut-animation">
              Sign Up
            </a> */}
        </>
      );
    }
  };

  return (
    <header className="flex items-center justify-between px-44 h-[4.5rem] mb-5 ">
      {/* Left side of header */}
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <a className="cursor-pointer">
            <Logo size={"w-11"} />
          </a>
        </Link>
      </div>

      {/* Right side of header */}
      <div className="flex items-center gap-4">
        <SearchBar />

        {loggedIn()}
      </div>
    </header>
  );
};

export default Navbar;
