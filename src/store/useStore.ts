import { create } from "zustand";

export interface StoreState {
    isOpenSidebar: boolean;
    toggleSidebar: () => void;
    brandColor: string;
    setBrandColor: (color: string) => void;
    renamedFolder: string | null;
    setRenamedFolder: (folderName: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
    isOpenSidebar: true,
    toggleSidebar: () =>
        set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
    brandColor: getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-color")
        .trim(),
    setBrandColor: (color) => set({ brandColor: color }),
    renamedFolder: null,
    setRenamedFolder: (folderId) => set({ renamedFolder: folderId }),
}));

export default useStore;
