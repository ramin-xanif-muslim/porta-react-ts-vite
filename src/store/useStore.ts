import { create } from "zustand";

export interface StoreState {
    isOpenSidebar: boolean;
    toggleSidebar: () => void;
}

const useStore = create<StoreState>((set) => ({
    isOpenSidebar: true,
    toggleSidebar: () => set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
}));

export default useStore;

