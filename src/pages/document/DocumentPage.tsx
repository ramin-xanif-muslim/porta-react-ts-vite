import { Table } from "antd";
import type { TableProps } from "antd";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import classNames from "classnames";
import { t } from "i18next";
import dayjs from "dayjs";
import { FaRegStar } from "react-icons/fa";

import { Document } from "./types";
import { useGetDocuments } from "./api/use-get-documents";
import FileUploader from "../../components/upload-document/FileUploader";
import { convertFileSize } from "../../lib/utils";
import DotsTableCell from "./components/dots-table-cell/DotsTableCell";
import { useUploadDocument } from "./api/use-upload-document";
import { DATE_FORMAT } from "../../constants";
import { getFileIcon } from "./utils/file-icons";
import {
  useListPageContext,
  withListPageContext,
} from "../../HOC/withListPageContext";

const DocumentPageComponent = () => {
  const { id = "" } = useParams();

  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange } =
    useListPageContext<Document>();

  const { documents, total, isLoading, isFetching } = useGetDocuments({
    folderId: id,
    params: {
      pageSize,
      currentPage,
      sort,
    },
  });

  const uploadDocument = useUploadDocument({ folderId: id });

  const columns = useMemo<TableProps<Document>["columns"]>(
    () => [
      {
        title: "",
        dataIndex: "icon",
        key: "icon",
        render: (_, record) => getFileIcon(record),
      },
      {
        title: t("Name"),
        dataIndex: "name",
        key: "name",
        sorter: () => 0,
        render: (value) => <div className="line-clamp-1">{value}</div>,
      },
      {
        title: t("Size"),
        dataIndex: "fileSize",
        key: "fileSize",
        sorter: () => 0,
        render: (value, record) => (
          <div>{record.isFolder ? "-" : convertFileSize(value)}</div>
        ),
      },
      {
        title: t("Last modified"),
        dataIndex: "updatedOn",
        key: "updatedOn",
        sorter: () => 0,
        render: (value) => (
          <div className="line-clamp-1">{dayjs(value).format(DATE_FORMAT)}</div>
        ),
      },
      {
        title: t("Shared to"),
        key: "sharedTo",
        dataIndex: "sharedTo",
        render: () => <div className="line-clamp-1">0 users</div>,
      },
      {
        title: "",
        key: "isSelected",
        dataIndex: "isSelected",
        render: (val) => (
          <div className="cursor-pointer">
            <FaRegStar className={classNames({ "text-[#F2C94CFF]": val })} />
          </div>
        ),
      },
      {
        title: "",
        key: "dots",
        dataIndex: "dots",
        render: (_, record) => <DotsTableCell record={record} folderId={id} />,
      },
    ],
    [isFetching],
  );

  if (!id) return null;

  return (
    <div className="mt-2" key={id}>
      <FileUploader handleUpload={uploadDocument.handleCreate}>
        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={documents || []}
          onChange={(_, __, sorter) => onTableChange(sorter)}
          pagination={{
            ...tablePaginationConfig,
            total: total,
          }}
          scroll={{ x: window.innerHeight }}
        />
      </FileUploader>
    </div>
  );
};

const DocumentPage = withListPageContext(DocumentPageComponent);

export default DocumentPage;
