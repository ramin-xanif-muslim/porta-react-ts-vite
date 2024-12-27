import { create } from "zustand";

interface ModalProps {
  [key: string]: unknown;
}

interface ModalState {
  [key: string]: {
    isOpen: boolean;
    props?: ModalProps;
  };
}

interface ModalStore {
  modalState: ModalState;
  setModalState: (modalState: ModalState) => void;
  openModal: (modalId: string, props?: ModalProps) => void;
  closeModal: (modalId: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalState: {},
  setModalState: (modalState) => set({ modalState }),
  openModal: (modalId, props) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        [modalId]: { isOpen: true, props },
      },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        [modalId]: { isOpen: false },
      },
    })),
}));
