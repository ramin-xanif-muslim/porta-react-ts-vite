import { Button, Drawer } from "antd";
import { t } from "i18next";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";

import UploadFile from "../pages/document/components/dots-table-cell/UploadFile";
import { Document } from "../pages/document/types";
import { useModalStore } from "../store";

export default function FolderDetailsModal() {
  const { modalState, closeModal, openModal } = useModalStore();
  const record = modalState?.["folder-details"]?.props?.record as Document;

  return (
    <Drawer
      title={t("Details")}
      open={modalState?.["folder-details"]?.isOpen}
      onClose={() => closeModal("folder-details")}
      width={500}
      className="!bg-bg"
    >
      <div className="flex gap-10">
        <UploadFile document={record}>
          <Button icon={<RiFileEditLine />}>{t("Edit file")}</Button>
        </UploadFile>
        <Button
          icon={<MdOutlineDriveFileRenameOutline />}
          onClick={() =>
            openModal("rename-document", {
              documentId: record.id,
              name: record.name,
            })
          }
        >
          {t("Edit Name")}
        </Button>
        <Button icon={<MdOutlineDriveFileRenameOutline />}>
          {t("Edit Tags")}
        </Button>
      </div>
    </Drawer>
  );
}
