const modalsSlice = (set, get) => ({
  showSearchResultBox: false,
  showRatingsModal: false,
  showReviewModal: false,
  setModalState: (modal) => {
    set(modal);
  },
});

export default modalsSlice;
