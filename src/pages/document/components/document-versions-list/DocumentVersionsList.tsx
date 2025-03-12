import { Table } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";

import ErrorBoundary from "../../../../components/error-boundary/ErrorBoundary";
import { CreateBtn } from "../../../../components/ui/buttons";
import { DATE_FORMAT } from "../../../../constants";
import { convertFileSize } from "../../../../lib/utils";
import { DocumentVersionDTO } from "../../../../types";
import { useGetDocumentsVersionsList } from "../../api/use-get-documents-versions-list";
import UploadNewVersion from "../dots-table-cell/UploadNewVersion";

interface DocumentVersionsListProps {
  documentId: string;
  folderId: string;
}

const DocumentVersionsList = ({
  documentId,
  folderId,
}: DocumentVersionsListProps) => {
  const { data, isFetching } = useGetDocumentsVersionsList({
    documentId,
    folderId,
    open: true,
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
    <ErrorBoundary>
      <h2 className="flex w-full items-center justify-between">
        <h2>{t("Document Versions")}</h2>
        <UploadNewVersion documentId={documentId}>
          <CreateBtn>{t("Add Version")}</CreateBtn>
        </UploadNewVersion>
      </h2>
      <Table<DocumentVersionDTO>
        columns={columns}
        dataSource={data?.data.list || []}
        loading={isFetching}
        pagination={false}
        size="small"
      />
    </ErrorBoundary>
  );
};

export default DocumentVersionsList;
