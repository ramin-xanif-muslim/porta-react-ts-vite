import { Button } from "antd";
import { t } from "i18next";
import { PiDownload } from "react-icons/pi";

interface DownloadBtnProps {
  onClick?: () => void;
  size?: "large" | "small";
  children?: React.ReactNode;
}

export const DownloadBtn = ({
  onClick,
  size = "large",
  children,
}: DownloadBtnProps) => {
  return (
    <Button size={size} icon={<PiDownload />} onClick={onClick}>
      {children || t("Download")}
    </Button>
  );
};
