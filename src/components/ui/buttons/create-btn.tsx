import { Button } from "antd";
import { t } from "i18next";
import { FiPlusCircle } from "react-icons/fi";

interface CreateBtnProps {
  onClick?: () => void;
  size?: "large" | "small";
  type?: "primary" | "default" | "dashed" | "link" | "text";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const CreateBtn = ({
  onClick,
  size = "large",
  type = "primary",
  icon = <FiPlusCircle />,
  children,
}: CreateBtnProps) => {
  return (
    <Button size={size} type={type} icon={icon} onClick={onClick}>
      {children || t("Create")}
    </Button>
  );
};
