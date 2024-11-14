import { create } from "zustand";

export interface StoreState {
    activeMenu: string | null;
    handleSelectMenu: (item: string) => void;
}

const useStore = create<StoreState>((set) => ({
    activeMenu: null,
    handleSelectMenu: (item) => set({ activeMenu: item }),
}));

export default useStore;
