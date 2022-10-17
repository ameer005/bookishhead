import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useToggle from "../../hooks/useToggle";
import useStore from "../../store/useStore";

import { MdSearch } from "react-icons/md";

import Logo from "../../components/ui/Logo";
import Avatar from "../ui/Avatar";
import SearchBar from "../ui/SearchBar";
import NavLink from "../ui/NavLink";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const showMobileSearch = useStore((state) => state.showMobileSearch);
  const setModalState = useStore((state) => state.setModalState);
  const router = useRouter();
  const removeUser = useStore((state) => state.removeUser);
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="outline-none">
              <Avatar avatarImg={user?.userImage} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              loop={true}
              className="relative py-4 px-5 flex flex-col gap-1 shadow-md rounded-lg text-sm"
            >
              <DropdownMenu.Item className="outline-none hover:text-colorBlack focus:text-colorPrimaryLight3 text-gray-500">
                <Link href={"/user/profile"}>Profile</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="outline-none hover:text-colorBlack focus:text-colorPrimaryLight3 text-gray-500">
                <Link href={"/user/list"}>Books List</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  removeUser();
                  router.reload(window.location.pathname);
                }}
                className="outline-none hover:text-colorBlack focus:text-colorPrimaryLight3 text-gray-500"
              >
                Log Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
    <header className="flex items-center justify-between px-44 3xl:px-20 2xl:px-8 md:px-5 h-[4.5rem] mb-5 ">
      {/* Left side of header */}
      <nav className="flex items-center gap-6">
        <Link href={"/"}>
          <a className="cursor-pointer">
            <Logo size={"w-11"} />
          </a>
        </Link>
        {isUserLoggedin && (
          <ul className="flex items-center text-sm gap-8 xl:hidden">
            {navigation()}
          </ul>
        )}
      </nav>

      {/* Right side of header */}
      <div className="flex items-center gap-4">
        {/* search toggle for mobile */}
        <div className="md:hidden">
          <SearchBar />
        </div>
        <button
          className="hidden md:block"
          onClick={() => setModalState({ showMobileSearch: true })}
        >
          <MdSearch className="h-7 w-7 text-colorGray/70" />
        </button>

        {/* search input for mobile view */}
        {showMobileSearch && (
          <div className="hidden md:block">
            <SearchBar />
          </div>
        )}

        {loggedIn()}
      </div>
    </header>
  );
};

export default Navbar;
