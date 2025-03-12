import { Drawer, Table, type TableProps } from "antd";
import { t } from "i18next";

import { CreateBtn } from "../components/ui/buttons";
import UploadNewVersion from "../pages/document/components/dots-table-cell/UploadNewVersion";
import { Document } from "../pages/document/types";
import { useModalStore } from "../store";
import { useGetDocumentsVersionsList } from "../pages/document/api/use-get-documents-versions-list";
import { DocumentVersionDTO } from "../types";
import { convertFileSize } from "../lib/utils";
import { DATE_FORMAT } from "../constants";
import dayjs from "dayjs";

export default function DocumentVersionsModal() {
  const { modalState, closeModal } = useModalStore();

  const isOpen = modalState?.["document-versions"]?.isOpen;
  const record = modalState?.["document-versions"]?.props?.record as Document;
  const folderId = modalState?.["document-versions"]?.props?.folderId as string;
    const { data, isFetching } = useGetDocumentsVersionsList({
      documentId: record.id,
      folderId,
      open: isOpen,
    });
  
    const columns: TableProps<DocumentVersionDTO>["columns"] = [
      {
        title: t("File Extension"),
        dataIndex: "fileExtension",
        key: "fileExtension",
      },
      {
        title: t("Size"),
        dataIndex: "fileSize",
        key: "fileSize",
        render: (value) => convertFileSize(value),
      },
      {
        title: t("Created On"),
        dataIndex: "createdOn",
        key: "createdOn",
        render: (value) => dayjs(value).format(DATE_FORMAT),
      },
      {
        title: t("Version"),
        dataIndex: "number",
        key: "number",
      },
    ];

  return (
    <Drawer
      title={
        <div className="flex w-full items-center justify-between">
          <h2>{t("Document Versions")}</h2>
          <UploadNewVersion documentId={record.id}>
            <CreateBtn>{t("Add Version")}</CreateBtn>
          </UploadNewVersion>
        </div>
      }
      open={isOpen}
      onClose={() => closeModal("document-versions")}
      width={800}
      className="!bg-bg"
    >
    <Table<DocumentVersionDTO>
      columns={columns}
      dataSource={data?.data.list || []}
      loading={isFetching}
      pagination={false}
      size="small"
    />
    </Drawer>
  );
}
