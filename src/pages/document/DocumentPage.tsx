// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
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

const DocumentPage = () => {
  const { id = "" } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPlaceholderData, isFetching } = useGetDocuments({
    folderId: id,
  });

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

  const uploadDocument = useUploadDocument({ folderId: id });

  if (!id) return null;

  return (
    <div className="mt-2" key={id}>
      <FileUploader handleUpload={uploadDocument.handleCreate}>
        <Table<Document>
          onChange={(pagination, filters, sorter) => {
            console.log({ pagination, filters, sorter });
            if (!Array.isArray(sorter)) {
              if (searchParams) {
                setSearchParams((prev) => {
                  if (sorter.field)
                    prev.set("sortBy", `${sorter.field}.${sorter.order}`);
                  else prev.delete("sortBy");
                  return prev;
                });
              }
            }
          }}
          pagination={false}
          scroll={{ x: window.innerHeight }}
          columns={columns}
          dataSource={data || []}
          loading={isPlaceholderData}
          onRow={(record) => ({
            onClick: () => {
              console.log(record);
            },
          })}
        />
      </FileUploader>
    </div>
  );
};

export default DocumentPage;
