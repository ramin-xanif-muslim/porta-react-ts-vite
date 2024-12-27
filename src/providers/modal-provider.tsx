import { ReactNode, useEffect, useState } from "react";
import { dynamicImport } from "../lib/utils";
import { useModalStore } from "../store";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalComponents {
  [key: string]: React.ComponentType;
}

interface ModalProps {
  [key: string]: unknown;
}

interface ModalState {
  [key: string]: {
    isOpen: boolean;
    props?: ModalProps;
  };
}

function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalComponents>({});
  const modalState = useModalStore((state) => state.modalState);
  const setModalState = useModalStore((state) => state.setModalState);

  const getModals = async () => {
    const modals = await dynamicImport();
    // Initialize modal state for each modal
    const initialModalState: ModalState = {};
    Object.keys(modals).forEach((key) => {
      initialModalState[key] = { isOpen: false };
    });
    setModalState(initialModalState);
    setModals(modals);
  };

  useEffect(() => {
    getModals();
  }, []);

  return (
    <>
      {children}
      {Object.keys(modals).map((key) => {
        const Component = modals[key];
        // Only render modal if it's open
        return modalState[key]?.isOpen ? (
          <Component key={key} {...modalState[key].props} />
        ) : null;
      })}
    </>
  );
}

export default ModalProvider;
