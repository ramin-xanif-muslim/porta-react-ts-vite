import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
// import { FaRegFolderOpen } from "react-icons/fa";
// import { FaShareFromSquare } from "react-icons/fa6";
// import { IoMdLink } from "react-icons/io";
// import { FiDownload } from "react-icons/fi";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import { IoMdMove } from "react-icons/io";
// import { LiaCopySolid } from "react-icons/lia";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import { t } from "i18next";
import { useState } from "react";
import RenameDocument from "./RenameDocument";
import { DocumentDataDTO } from "../../../types";
import UploadNewVersion from "./UploadNewVersion";
import { RiFileEditLine } from "react-icons/ri";
import UploadFile from "./UploadFile";
import ErrorBoundary from "../../../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../../../components/error-boundary/ErrorFallback";



interface DotsTableCellProps {
  record: DocumentDataDTO;
}

const DotsTableCell = ({ record }: DotsTableCellProps) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isUploadNewVersionModalOpen, setIsUploadNewVersionModalOpen] =
    useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Rename") {
      setIsRenameModalOpen(true);
    }
    if (e.key === "UploadNewVersion") {
      setIsUploadNewVersionModalOpen(true);
    }
  };
  const items: MenuProps["items"] = [
    // {
    //   key: "OpenIn",
    //   label: t("Open in"),
    //   icon: <FaRegFolderOpen className="size-5" />,
    // },
    // {
    //   type: "divider",
    // },
    // {
    //   key: "Share",
    //   label: t("Share"),
    //   icon: <FaShareFromSquare className="size-5" />,
    // },
    // {
    //   key: "CopyLink",
    //   label: t("Copy link"),
    //   icon: <IoMdLink className="size-5" />,
    // },
    // {
    //   key: "Download",
    //   label: t("Download"),
    //   icon: <FiDownload className="size-5" />,
    // },
    // {
    //   type: "divider",
    // },
    // {
    //   key: "Delete",
    //   label: t("Delete"),
    //   icon: <MdOutlineDeleteForever className="size-5" />,
    // },
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
      label: t("Upload New Version"),
      icon: <MdUploadFile className="size-5" />,
    },
    // {
    //   key: "Move",
    //   label: t("Move"),
    //   icon: <IoMdMove className="size-5" />,
    // },
    // {
    //   key: "Copy",
    //   label: t("Copy"),
    //   icon: <LiaCopySolid className="size-5" />,
    // },
  ];

  return (
    
    <ErrorBoundary
    fallback={<ErrorFallback error={new Error('Failed to load DotsTableCell')} />}
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

      <UploadNewVersion
        isOpen={isUploadNewVersionModalOpen}
        onClose={() => setIsUploadNewVersionModalOpen(false)}
        document={record}
      />
    </ErrorBoundary>
  );
};

export default DotsTableCell;
