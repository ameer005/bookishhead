const conditionalSlice = (set, get) => ({
  listOption: "completed",
  setOption: (status) => {
    set(status);
  },
});

export default conditionalSlice;
