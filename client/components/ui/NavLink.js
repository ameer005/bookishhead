import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ path, className, activeClass, name }) => {
  const { pathname } = useRouter();
  const isActive = pathname === path ? true : false;

  return (
    <Link href={path}>
      <a className={`${className} ${isActive ? activeClass : "text-gray-400"}`}>
        {name}
      </a>
    </Link>
  );
};

export default NavLink;
