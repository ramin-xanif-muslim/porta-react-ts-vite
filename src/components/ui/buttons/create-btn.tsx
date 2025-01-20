import { Button } from "antd";
import { t } from "i18next";
import { FaCirclePlus } from "react-icons/fa6";


interface CreateBtnProps {
  onClick?: () => void;
  size?: "large" | "small";
  type?: "primary" | "default" | "dashed" | "link" | "text";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const CreateBtn = ({
  onClick,
  size = "large",
  type = "link",
  icon = <FaCirclePlus  />,
  children,
  disabled,
}: CreateBtnProps) => {
  return (
    <Button className="text-brand" size={size} type={type} icon={icon} onClick={onClick} disabled={disabled}>
      {children || t("Create")}
    </Button>
  );
};
