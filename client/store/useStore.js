import create from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";
import modalsSlice from "./slices/modalSlice";
import conditionalSlice from "./slices/conditionalSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
    ...modalsSlice(set, get),
    ...conditionalSlice(set, get),
  }))
);

export default useStore;
