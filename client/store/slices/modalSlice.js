const modalsSlice = (set, get) => ({
  showSearchResultBox: false,
  setResultBoxState: (state) => {
    set({ showSearchResultBox: state });
  },
});

export default modalsSlice;
