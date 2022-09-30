const modalsSlice = (set, get) => ({
  showSearchResultBox: false,
  showRatingsModal: false,
  setResultBoxState: (state) => {
    set({ showSearchResultBox: state });
  },
  setRatingsModalState: (state) => {
    set({ showRatingsModal: state });
  },
});

export default modalsSlice;
