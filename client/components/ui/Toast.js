import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useStore from "../../store/useStore";

const Toast = ({}) => {
  const setModalState = useStore((state) => state.setModalState);
  const toastProperties = useStore((state) => state.toastProperties);

  const toastState =
    toastProperties.type === "error"
      ? "bg-red-100 text-red-400"
      : "bg-green-400 text-colorWhite";

  useEffect(() => {
    setTimeout(() => {
      setModalState({ showToastModal: false });
    }, 2000);
  }, []);

  return (
    <div
      className={`absolute top-6 left-[50%] -translate-x-[50%] px-5 sm:px-3 py-3  rounded-md z-[1000] ${toastState}`}
    >
      <div className="flex gap-1 items-center">
        <button onClick={() => setModalState({ showToastModal: false })}>
          <AiFillCloseCircle className="text-base cursor-pointer" />
        </button>
        <div className=" font-bold text-xs">{toastProperties.message}</div>
      </div>
    </div>
  );
};

export default Toast;
