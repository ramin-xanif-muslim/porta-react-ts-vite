import { Table } from "antd";
import type { TableProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
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
import { PageContentHeader } from "../../components/page-content-header";

const DocumentPageComponent = () => {
  const { id = "" } = useParams();

  const navigate = useNavigate();

  const {
    tablePaginationConfig,
    currentPage,
    pageSize,
    sort,
    onTableChange,
    searchText,
  } = useListPageContext<Document>();

  const { documents, total, isLoading, isFetching } = useGetDocuments({
    folderId: id,
    params: {
      pageSize,
      currentPage,
      sort,
      searchText,
    },
  });

  const onDoubleClickName = (
    e: React.MouseEvent<HTMLDivElement>,
    record: Document,
  ) => {
    console.log(record);
    e.stopPropagation();
    e.preventDefault();
    if (record.isFolder) {
      navigate(`/documents/documents/folders/${record.id}`);
    }
  };

  const uploadDocument = useUploadDocument({ folderId: id });

  const columns = useMemo<TableProps<Document>["columns"]>(
    () => [
      {
        title: "",
        key: "dots",
        dataIndex: "dots",
        fixed: "left",
        width: 50,
        render: (_, record) => <DotsTableCell record={record} folderId={id} />,
      },
      {
        title: "",
        dataIndex: "icon",
        key: "icon",
        render: (_, record) => (
          <div onDoubleClick={(e) => onDoubleClickName(e, record)}>
            {getFileIcon(record)}
          </div>
        ),
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
    ],
    [isFetching],
  );

  return (
    <div className="content-page" key={id}>
      <PageContentHeader total={total} />
      <FileUploader handleUpload={uploadDocument.handleCreate}>
        <div className="table-page-wrapper">
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
        </div>
      </FileUploader>
    </div>
  );
};

const DocumentPage = withListPageContext(DocumentPageComponent);

export default DocumentPage;
