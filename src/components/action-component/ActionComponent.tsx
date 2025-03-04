import { t } from "i18next";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

export type ActionType = "Delete" | "Move";

interface ActionComponentProps {
  action: ActionType | undefined | null;
  selectedCount: number;
  handleClose: () => void;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "Delete":
      return <RiDeleteBinLine className="size-5" />;
    case "Move":
      return <FaShareFromSquare className="size-5" />;
    default:
      return null;
  }
};
export const ActionComponent = ({
  action,
  selectedCount,
  handleClose,
}: ActionComponentProps) => {
  if (!action) return null;
  return (
    <div className="flex h-full items-center">
      <div className="flex items-center gap-2">
        <span onClick={handleClose}>
          <IoClose />
        </span>
        <span>{t("Selected Count")}</span>
        <span>{selectedCount}</span>
      </div>
      <span className="ml-4 cursor-pointer text-brand">{getIcon(action || "")}</span>
    </div>
  );
};
