import create from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/userSlice";

const useStore = create(
  devtools((set, get) => ({
    ...userSlice(set, get),
  }))
);

export default useStore;
