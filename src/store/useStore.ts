import { create } from "zustand";

export interface StoreState {
    isOpenSidebar: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    brandColor: string;
    setBrandColor: (color: string) => void;
    renamedFolder: string | null;
    setRenamedFolder: (folderName: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
    isOpenSidebar: true,
    toggleSidebar: () =>
        set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
    closeSidebar: () => set(() => ({ isOpenSidebar: false })),
    openSidebar: () => set(() => ({ isOpenSidebar: true })),
    brandColor: getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-color")
        .trim(),
    setBrandColor: (color) => set({ brandColor: color }),
    renamedFolder: null,
    setRenamedFolder: (folderId) => set({ renamedFolder: folderId }),
}));

export default useStore;
