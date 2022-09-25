import Link from "next/link";
import useToggle from "../../hooks/useToggle";
import useStore from "../../store/useStore";

import Logo from "../../components/ui/Logo";
import Avatar from "../ui/Avatar";
import SearchBar from "../ui/SearchBar";
import CaretDropdown from "../ui/CaretDropdown";

const Navbar = () => {
  const user = useStore((state) => state.user);
  const { state: profileDropdown, toggle: toggleProfileDropdown } = useToggle();

  const loggedIn = () => {
    if (user) {
      return (
        <div
          onClick={toggleProfileDropdown}
          className="flex gap-2 items-center cursor-pointer text-colorBlack hover:text-colorPrimary ut-animation"
        >
          <Avatar />
          <div className="flex gap-1 items-center">
            <div className="text-sm font-semibold ">Ameer</div>
            <CaretDropdown isOpen={profileDropdown} />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Link href={"/login"}>
            <a className="py-3  w-[5rem] text-center rounded-md font-semibold hover:bg-colorPrimary ut-animation">
              Login
            </a>
          </Link>
          <Link href={"/signup"}>
            <a className="py-3  w-[5rem] text-center rounded-md font-semibold hover:bg-colorPrimary ut-animation">
              Sign Up
            </a>
          </Link>
        </>
      );
    }
  };

  return (
    <header className="flex items-center justify-between px-28 h-[4rem] mb-3 border-b border-colorNav">
      {/* Left side of header */}
      <div className="flex items-center gap-6 w-full">
        <Link href={"/"}>
          <a className="cursor-pointer">
            <Logo />
          </a>
        </Link>

        <SearchBar />
      </div>

      {/* Right side of header */}
      <div className="flex items-center gap-2">{loggedIn()}</div>
    </header>
  );
};

export default Navbar;
