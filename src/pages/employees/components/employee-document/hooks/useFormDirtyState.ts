import { useState, useEffect } from "react";
import { FormInstance } from "antd";

export const useFormDirtyState = (form: FormInstance) => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleFormChange = () => {
    setIsFormDirty(form.isFieldsTouched());
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  return { isFormDirty, setIsFormDirty, handleFormChange };
};