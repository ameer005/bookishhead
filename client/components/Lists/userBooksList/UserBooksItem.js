import Link from "next/link";
import { useRouter } from "next/router";

const UserBooksItem = ({ data }) => {
  const router = useRouter();
  const book = data?.book;
  return (
    <div onClick={() => router.push(`/books/${book._id}`)}>
      <div className="mb-3 h-48 w-[8rem] relative text-colorWhite hover:text-colorPrimaryLight cursor-pointer">
        <img
          className="object-containl w-full h-full rounded-md"
          src={book.coverImg}
        ></img>

        <div className="py-2 px-3  text-xs  absolute bottom-0 left-0 z-10 bg-colorBlack/60 min-h-[3rem]  w-full rounded-b-md ">
          <div className=" font-medium  ut-animation">{book.title}</div>
        </div>
      </div>
    </div>
  );
};

export default UserBooksItem;
