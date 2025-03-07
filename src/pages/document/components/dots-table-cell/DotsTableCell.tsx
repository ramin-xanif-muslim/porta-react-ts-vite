import { Button, Dropdown, MenuProps } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdDetails } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { VscVersions } from "react-icons/vsc";

import { useListPageContext } from "../../../../HOC/withListPageContext";
import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../../components/error-boundary/ErrorFallback";
import { useModalStore } from "../../../../store/modal-store";
import { Document } from "../../types";
import DocumentVersionsList from "../document-versions-list/DocumentVersionsList";

interface DotsTableCellProps {
  record: Document;
  folderId: string;
}

const DotsTableCell = ({ record, folderId }: DotsTableCellProps) => {
  const [isVersionsModalOpen, setIsVersionsModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const { openModal } = useModalStore();

  const { setAction } = useListPageContext();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Rename") {
      openModal("rename-document", {
        documentId: record.id,
        name: record.name,
      });
    } else if (e.key === "VersionsList") {
      if (!record.isFolder) {
        setSelectedDocumentId(record.id);
        setIsVersionsModalOpen(true);
      }
    } else if (e.key === "AddComment") {
      openModal("create-comment", { documentId: record.id });
    } else if (e.key === "CommentList") {
      openModal("comment-list", { documentId: record.id });
    } else if (e.key === "Details") {
      openModal("folder-details", { record: record });
    } else if (e.key === "Delete") {
      setAction("Delete");
    } else if (e.key === "Move") {
      setAction("Move");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "VersionsList",
      label: t("Versions"),
      icon: <VscVersions className="size-5" />,
    },
    {
      type: "divider",
    },
    {
      key: "CommentList",
      label: t("Comments"),
      icon: <AiOutlineComment className="size-5" />,
    },
    {
      type: "divider",
    },
    {
      key: "Details",
      label: t("Details"),
      icon: <MdDetails className="size-5" />,
    },
    {
      type: "divider",
    },
    {
      key: "Delete",
      label: t("Delete"),
      icon: <RiDeleteBinLine className="size-5" />,
    },
    {
      key: "Move",
      label: t("Move"),
      icon: <FaShareFromSquare className="size-5" />,
    },
  ];

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback error={new Error("Failed to load DotsTableCell")} />
      }
    >
      {record.isFolder ? (
        <Dropdown
          menu={{
            items: [
              {
                key: "Rename",
                label: t("Rename"),
                icon: <MdOutlineDriveFileRenameOutline className="size-5" />,
              },
            ],
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
          className="cursor-pointer"
          overlayClassName="text-[#565D6DFF]"
          trigger={["click"]}
        >
          <Button
            type="text"
            size="small"
            icon={<BsThreeDots className="text-grayColor-600" />}
            shape="circle"
          />
        </Dropdown>
      ) : (
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
          className="cursor-pointer"
          overlayClassName="text-[#565D6DFF]"
          trigger={["click"]}
        >
          <Button
            type="text"
            size="small"
            icon={<BsThreeDots className="text-grayColor-600" />}
            shape="circle"
          />
        </Dropdown>
      )}

      <DocumentVersionsList
        documentId={selectedDocumentId || ""}
        folderId={folderId}
        open={isVersionsModalOpen}
        onClose={() => {
          setIsVersionsModalOpen(false);
          setSelectedDocumentId(null);
        }}
      />
    </ErrorBoundary>
  );
};

export default DotsTableCell;
