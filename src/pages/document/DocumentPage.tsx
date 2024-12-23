// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import classNames from "classnames";
import { t } from "i18next";
import dayjs from "dayjs";

import { FaRegFolder } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaRegStar } from "react-icons/fa";
import { GrDocumentTxt } from "react-icons/gr";
import { FaRegFileExcel } from "react-icons/fa";

import { DocumentDataDTO } from "../../types";
import { useGetDocuments } from "./api/use-get-documents";
import FileUploader from "../../components/upload-document/FileUploader";
import { convertFileSize } from "../../lib/utils";
import DotsTableCell from "./components/dots-table-cell/DotsTableCell";
import { useUploadDocument } from "./api/use-upload-document";
import { DATE_FORMAT } from "../../constants";

const DocumentPage = () => {
  const { id = "" } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPlaceholderData, isFetching } = useGetDocuments({
    folderId: id,
  });

  const columns = useMemo<TableProps<DocumentDataDTO>["columns"]>(
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
        <Table<DocumentDataDTO>
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




export function getFileIcon(data: DocumentDataDTO) {
  const { fileExtension, isFolder } = data;

  if (isFolder) return <FaRegFolder className="size-5 text-[#15ABFFFF]" />;

  switch (fileExtension) {
    case "zip":
      return <FaRegFolder className="size-5 text-[#15ABFFFF]" />;
    case "pdf":
      return <GrDocumentPdf className="size-5 text-[#DE3B40FF]" />;
    case "jpg":
      return <CiImageOn className="size-5 text-[#424856FF]" />;
    case "pptx":
      return <BsFiletypePptx className="size-5 text-[#D29211FF]" />;
    case "xlsx":
      return <BsFiletypeXlsx className="size-5 text-[#117B34FF]" />;
    case "doc":
    case "docx":
      return <CgFileDocument className="size-5 text-[#197DCAFF]" />;
    case "text":
    case "txt":
      return <GrDocumentTxt className="size-5 text-[#D29211FF]" />;

    default:
      return <FaRegFileExcel className="size-5 text-red-500" />;
  }
};