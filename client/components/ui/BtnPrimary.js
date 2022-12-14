import LoadingSpinner from "./LoadingSpinner";

const BtnPrimary = ({ type, bgColor, textColor, text, loading }) => {
  return (
    <button
      className={`${bgColor} ${textColor} text-sm w-full py-3 px-4 rounded-lg font-semibold hover:bg-colorPrimaryLight ut-animation`}
      type={type || "button"}
    >
      {loading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default BtnPrimary;
