import React from "react";

import Logo from "../../components/ui/Logo";
import Avatar from "../ui/Avatar";
import SearchBar from "../ui/SearchBar";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-28 h-[4rem] mb-2">
      <div className="flex items-center gap-6 w-full">
        <Logo />
        <SearchBar />
      </div>
      <div>
        <Avatar />
      </div>
    </header>
  );
};

export default Navbar;
