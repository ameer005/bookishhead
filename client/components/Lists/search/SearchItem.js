import { useRouter } from "next/router";
import useStore from "../../../store/useStore";

const SearchItem = ({ data }) => {
  const setResultBoxState = useStore((state) => state.setResultBoxState);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/books/${data._id}`);
        setResultBoxState(false);
      }}
      className="flex gap-4 text-xs cursor-pointer hover:bg-colorPrimary/20 p-2"
    >
      <div className="h-20 w-14 shrink-0">
        <img
          className="object-fill h-full w-full"
          src={data.coverImg}
          alt={data.title}
        />
      </div>
      <div>
        <div className="font-calson font-medium text-sm mb-1">{data.title}</div>
        <div className="font-medium text-colorSecondary3 text-sm">
          {data.author}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
