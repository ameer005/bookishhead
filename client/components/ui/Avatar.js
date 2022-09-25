import Image from "next/image";
import defaultAvatar from "../../public/images/avatar-default.png";

const Avatar = ({ avatarImg }) => {
  return (
    <div className="h-7 w-7 rounded-full cursor-pointer">
      <Image src={avatarImg || defaultAvatar}></Image>
    </div>
  );
};

export default Avatar;
