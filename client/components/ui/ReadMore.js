import useToggle from "../../hooks/useToggle";

const ReadMore = ({ limit, text }) => {
  const { state: readMoreShown, toggle: setReadMoreShown } = useToggle();

  const showDots = text.length > limit ? "..." : "";

  return (
    <div className="flex flex-col items-start">
      <p className="mr-1 font-medium leading-[22px] text-gray-500 whitespace-pre-line">
        {readMoreShown ? text : text.substr(0, limit) + showDots}
      </p>
      {text.length > limit && (
        <button
          className="font-medium text-colorPrimary self-end"
          onClick={() => setReadMoreShown()}
        >
          {readMoreShown ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
