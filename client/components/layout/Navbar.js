import { useState, useEffect } from "react";
import Link from "next/link";
import useToggle from "../../hooks/useToggle";
import useStore from "../../store/useStore";

import Logo from "../../components/ui/Logo";
import Avatar from "../ui/Avatar";
import SearchBar from "../ui/SearchBar";
import CaretDropdown from "../ui/CaretDropdown";
import NavLink from "../ui/NavLink";

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

  const navigation = () => {
    const pages = [
      { name: "Home", path: "/" },
      { name: "Profile", path: "/user/profile" },
      { name: "Books List", path: "/user/list" },
    ];

    return pages.map((page, index) => {
      return (
        <li key={index}>
          <NavLink
            className="font-semibold hover:text-colorBlack ut-animation"
            path={page.path}
            name={page.name}
            activeClass="text-colorPrimary"
          />
        </li>
      );
    });
  };

  return (
    <header className="flex items-center justify-between px-44 h-[4.5rem] mb-5 ">
      {/* Left side of header */}
      <nav className="flex items-center gap-6">
        <Link href={"/"}>
          <a className="cursor-pointer">
            <Logo size={"w-11"} />
          </a>
        </Link>
        <ul className="flex items-center text-sm gap-8">{navigation()}</ul>
      </nav>

      {/* Right side of header */}
      <div className="flex items-center gap-4">
        <SearchBar />

        {loggedIn()}
      </div>
    </header>
  );
};

export default Navbar;
