import { Button } from "antd";
import { t } from "i18next";
import { FaCirclePlus } from "react-icons/fa6";


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
  type = "link",
  icon = <FaCirclePlus  />,
  children,
}: CreateBtnProps) => {
  return (
    <Button className="text-brand" size={size} type={type} icon={icon} onClick={onClick}>
      {children || t("Create")}
    </Button>
  );
};
