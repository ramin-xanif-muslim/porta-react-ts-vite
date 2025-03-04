import { Button, Popconfirm } from "antd";
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

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000);
    });

  return (
    <div className="flex h-full items-center">
      <div className="flex items-center gap-2">
        <Button
          type="text"
          size="small"
          onClick={handleClose}
          icon={<IoClose className="size-5" />}
          shape="circle"
        />
        <span>{t("Selected Count")}</span>
        <span>{selectedCount}</span>
      </div>
      <span className="ml-4 cursor-pointer text-brand">
        {action && selectedCount > 0 && (
          <Popconfirm
            title={t(action)}
            description={t(
              `Are you sure to ${action.toLowerCase()} this files?`,
            )}
            onConfirm={async () => {
              await confirm();
              handleClose();
            }}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button
              type="text"
              size="small"
              icon={getIcon(action)}
              shape="circle"
              className="text-brand hover:!text-brand-600"
            />
          </Popconfirm>
        )}
      </span>
    </div>
  );
};
