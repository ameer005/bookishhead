const modalsSlice = (set, get) => ({
  showSearchResultBox: false,
  showMobileSearch: false,
  showRatingsModal: false,
  showReviewModal: false,
  showToastModal: false,
  toastProperties: {
    type: "",
    message: "",
  },
  setModalState: (modal) => {
    set(modal);
  },
});

export default modalsSlice;
