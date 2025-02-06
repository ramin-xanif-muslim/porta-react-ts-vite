import { Dropdown, MenuProps } from "antd";
import { t } from "i18next";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";
import { VscVersions } from "react-icons/vsc";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

import RenameDocument from "./RenameDocument";
import { Document } from "../../types";
import UploadNewVersion from "./UploadNewVersion";
import UploadFile from "./UploadFile";
import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../../components/error-boundary/ErrorFallback";
import DocumentVersionsList from "../document-versions-list/DocumentVersionsList";
import { useModalStore } from "../../../../store/modal-store";

interface DotsTableCellProps {
  record: Document;
  folderId: string;
}

const DotsTableCell = ({ record, folderId }: DotsTableCellProps) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  useState(false);

  const [isVersionsModalOpen, setIsVersionsModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const { openModal } = useModalStore();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Rename") {
      setIsRenameModalOpen(true);
    } else if (e.key === "VersionsList") {
      if (!record.isFolder) {
        setSelectedDocumentId(record.id);
        setIsVersionsModalOpen(true);
      }
    } else if (e.key === "AddComment") {
      openModal("create-comment", { documentId: record.id });
    } else if (e.key === "CommentList") {
      openModal("comment-list", { documentId: record.id });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "UploadNewVersion",
      label: (
        <UploadNewVersion document={record}>
          <div className="flex items-center gap-2">
            <span>
              <MdUploadFile className="size-5" />
            </span>
            <span>{t("New Version")}</span>
          </div>
        </UploadNewVersion>
      ),
    },
    {
      key: "VersionsList",
      label: t("List Versions"),
      icon: <VscVersions className="size-5" />,
    },
    {
      type: "divider",
    },
    {
      key: "AddComment",
      label: t("Add Comment"),
      icon: <FaRegCommentDots className="size-5" />,
    },
    {
      key: "CommentList",
      label: t("List Comments"),
      icon: <AiOutlineComment className="size-5" />,
    },
    {
      type: "divider",
    },
    {
      key: "EditFile",
      label: (
        <UploadFile document={record}>
          <div className="flex items-center gap-2">
            <span>
              <RiFileEditLine className="size-5" />
            </span>
            <span>{t("Edit file")}</span>
          </div>
        </UploadFile>
      ),
    },
    {
      key: "Rename",
      label: t("Edit Name"),
      icon: <MdOutlineDriveFileRenameOutline className="size-5" />,
    },
    {
      key: "EditTags",
      label: t("Edit Tags"),
      icon: <MdOutlineDriveFileRenameOutline className="size-5" />,
      disabled: true,
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
          <BsThreeDots className="text-grayColor-600" />
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
          <BsThreeDots className="text-grayColor-600" />
        </Dropdown>
      )}

      <RenameDocument
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        name={record.name}
        id={record.id}
      />

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
