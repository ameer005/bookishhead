import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(devtools((set, get) => ({})));

export default useStore;
