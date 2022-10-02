import Image from "next/image";
import logo from "../../public/images/logo.png";

const Logo = ({ size }) => {
  return (
    <div className={size || "w-16"}>
      <Image src={logo} />
    </div>
  );
};

export default Logo;
