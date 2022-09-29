import create from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";
import modalsSlice from "./slices/modalSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
    ...modalsSlice(set, get),
  }))
);

export default useStore;
