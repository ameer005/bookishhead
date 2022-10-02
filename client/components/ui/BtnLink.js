import Link from "next/link";

const BtnLink = ({ link, text }) => {
  return (
    <Link href={link}>
      <a className="py-2 w-[6rem] text-center rounded-md font-bold bg-colorPrimary hover:bg-colorPrimaryLight text-colorWhite text-sm ut-animation red-shadow">
        {text}
      </a>
    </Link>
  );
};

export default BtnLink;
