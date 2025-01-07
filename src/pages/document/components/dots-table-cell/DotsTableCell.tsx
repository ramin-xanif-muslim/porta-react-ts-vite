import { Dropdown, MenuProps } from "antd";
import { t } from "i18next";
import { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";
import { VscVersions } from "react-icons/vsc";

import RenameDocument from "./RenameDocument";
import { Document } from "../../types";
import UploadNewVersion from "./UploadNewVersion";
import UploadFile from "./UploadFile";
import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../../components/error-boundary/ErrorFallback";
import DocumentVersionsList from "../../../../components/document-versions-list/DocumentVersionsList";

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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Rename") {
      setIsRenameModalOpen(true);
    }
    if (e.key === "VersionsList") {
      if (!record.isFolder) {
        setSelectedDocumentId(record.id);
        setIsVersionsModalOpen(true);
      }
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "Rename",
      label: t("Rename"),
      icon: <MdOutlineDriveFileRenameOutline className="size-5" />,
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
      key: "UploadNewVersion",
      label: (
        <UploadNewVersion document={record}>
          <div className="flex items-center gap-2">
            <span>
              <MdUploadFile className="size-5" />
            </span>
            <span>{t("Upload New Version")}</span>
          </div>
        </UploadNewVersion>
      ),
    },
    {
      key: "VersionsList",
      label: t("Document Versions"),
      icon: <VscVersions className="size-5" />,
    },
  ];

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback error={new Error("Failed to load DotsTableCell")} />
      }
    >
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomRight"
        className="cursor-pointer"
        overlayClassName="text-[#565D6DFF]"
      >
        <BsThreeDotsVertical className="text-grayColor-600" />
      </Dropdown>

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
