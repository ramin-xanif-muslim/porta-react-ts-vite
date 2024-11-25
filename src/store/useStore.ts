import { create } from "zustand";

export interface StoreState {
    isOpenSidebar: boolean;
    toggleSidebar: () => void;
    brandColor: string;
    setBrandColor: (color: string) => void;
}

const useStore = create<StoreState>((set) => ({
    isOpenSidebar: true,
    toggleSidebar: () =>
        set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
    brandColor: getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-color")
        .trim(),
    setBrandColor: (color) => set({ brandColor: color }),
}));

export default useStore;
