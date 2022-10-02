import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import LoadingSpinner from "../ui/LoadingSpinner";

const SelectField = ({
  setSelectOpen,
  selectText,
  isSelectOpen,
  list,
  isLoading,
}) => {
  return (
    <div className="relative">
      <div
        onClick={() => setSelectOpen((prev) => !prev)}
        className=" py-[5px] px-3 flex items-center justify-between border border-colorGray rounded-md cursor-pointer"
      >
        {isLoading && (
          <div className="ml-auto mr-auto">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && (
          <>
            <span className="font-medium text-colorSecondary3">
              {selectText}
            </span>
            {isSelectOpen ? (
              <BiChevronUp className="text-colorSecondary3 font-medium  text-2xl" />
            ) : (
              <BiChevronDown className="text-colorSecondary3 font-medium  text-2xl" />
            )}
          </>
        )}
      </div>

      <div
        className={`hide-scrollbar shadow-md flex flex-col gap-1 bg-colorWhite absolute py-3 overflow-y-scroll top-[125%] left-0  w-full max-h-24 rounded-sm px-1 ${
          !isSelectOpen && "hidden"
        }`}
      >
        {list()}
      </div>
    </div>
  );
};

export default SelectField;
