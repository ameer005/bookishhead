import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const CaretDropdown = ({ isOpen }) => {
  return (
    <div className="h-5 w-5">{isOpen ? <BiCaretUp /> : <BiCaretDown />}</div>
  );
};

export default CaretDropdown;
