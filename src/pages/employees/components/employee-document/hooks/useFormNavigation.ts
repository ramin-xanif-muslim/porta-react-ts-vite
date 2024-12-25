import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { t } from "i18next";

export const useFormNavigation = (
  isFormDirty: boolean
) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (!isFormDirty) {
      navigate(-1);
      return;
    }

    Modal.confirm({
      title: t("Unsaved Changes"),
      content: t("You have unsaved changes. Are you sure you want to leave?"),
      okText: t("Leave"),
      cancelText: t("Stay"),
      onOk: () => {
        navigate(-1);
      },
    });
  };

  return { handleBackNavigation };
};