import useToggle from "../../hooks/useToggle";

const ReadMore = ({ limit, text }) => {
  const { state: readMoreShown, toggle: setReadMoreShown } = useToggle();

  return (
    <div className="flex flex-col items-start">
      <span className="mr-1 font-medium leading-[22px] text-colorSecondary3">
        {readMoreShown ? text : text.substr(0, limit) + "..."}
      </span>
      <button
        className="font-medium text-colorPrimary"
        onClick={() => setReadMoreShown()}
      >
        {readMoreShown ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

export default ReadMore;
