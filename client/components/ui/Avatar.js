import Image from "next/image";
import defaultAvatar from "../../public/images/default2.png";
import imagePath from "../../utils/imagePath";

const Avatar = ({ avatarImg }) => {
  const image = avatarImg ? `${imagePath}${avatarImg}` : defaultAvatar;

  return (
    <div className="relative h-7 w-7 rounded-full overflow-hidden  cursor-pointer">
      <Image objectFit="contain" layout="fill" src={image}></Image>
    </div>
  );
};

export default Avatar;
