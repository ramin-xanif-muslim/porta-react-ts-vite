import { Button, Popconfirm } from "antd";
import { t } from "i18next";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

import { documentsApi } from "../../pages/document/api/documentsApi";
import { useModalStore } from "../../store";

export type ActionType = "Delete" | "Move";

interface ActionComponentProps {
  action: ActionType | undefined | null;
  selectedRowKeys: string[];
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
  selectedRowKeys,
  handleClose,
}: ActionComponentProps) => {
  const selectedCount = selectedRowKeys.length;
  if (!action) return null;

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
          <ActionComponentTypes
            action={action}
            handleClose={handleClose}
            selectedRowKeys={selectedRowKeys}
          />
        )}
      </span>
    </div>
  );
};
const ActionComponentTypes = ({
  action,
  handleClose,
  selectedRowKeys,
}: {
  action: ActionType | undefined | null;
  selectedRowKeys: string[];
  handleClose: () => void;
}) => {
  const { openModal } = useModalStore();

  if (!action) return null;

  switch (action) {
    case "Delete":
      return (
        <Popconfirm
          title={t(action)}
          description={t(
            `Are you sure to ${action.toLowerCase()} these files?`,
          )}
          onConfirm={async () => documentsApi.deleteDocuments({ documentIds: selectedRowKeys }).then(() => handleClose())}
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
      );
    case "Move":
      return (
        <Button
          type="text"
          size="small"
          icon={getIcon(action)}
          shape="circle"
          className="text-brand hover:!text-brand-600"
          onClick={() =>
            openModal("move-action-alert", {
              selectedRowKeys,
              handleClose,
            })
          }
        />
      );
    default:
      return null;
  }
};
