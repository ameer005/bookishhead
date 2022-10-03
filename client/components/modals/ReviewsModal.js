import ReactDom from "react-dom";

const ReviewsModal = () => {
  return ReactDom.createPortal(
    <div
      onClick={() => setRatingsModalState(false)}
      className="fixed top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorbg text-colorNeutral w-full max-w-[30rem] px-7 py-6 md:px-5 rounded-sm relative"
      >
        yo
      </div>
    </div>,
    document.getElementById("modal-ratings")
  );
};

export default ReviewsModal;
