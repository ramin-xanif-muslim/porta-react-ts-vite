import { Button, Table } from "antd";
import type { TableProps } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { t } from "i18next";
import { useMemo } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useListPageContext } from "../../HOC/withListPageContext";
import { PageContentHeader } from "../../components/page-content-header";
import FileUploader from "../../components/upload-document/FileUploader";
import { DATE_FORMAT, TABLE_HEADER_OFFSET } from "../../constants";
import { convertFileSize } from "../../lib/utils";
import { useGlobalStore } from "../../store";
import { LookupTag } from "../tags/types";

import { useGetDocuments } from "./api/use-get-documents";
import DotsTableCell from "./components/dots-table-cell/DotsTableCell";
import { AdditionalFilterComponent } from "./components/filter/AdditionalFilterComponent";
import { FilterComponent } from "./components/filter/FilterComponent";
import { Document } from "./types";
import { getFileIcon } from "./utils/file-icons";

const DocumentPageComponent = () => {
  const selectedFolderId = useGlobalStore((state) => state.selectedFolderId);
  const selectFolderId = useGlobalStore((state) => state.selectFolderId);

  const navigate = useNavigate();

  const {
    tablePaginationConfig,
    currentPage,
    pageSize,
    sort,
    onTableChange,
    searchText,
    filterParams,
    additionalFilterParams,
    rowSelection,
    setCurrentPage,
    handleCloseAction,
  } = useListPageContext<Document>();

  const { documents, total, isLoading, isFetching } = useGetDocuments({
    folderId: selectedFolderId,
    params: {
      pageSize,
      currentPage,
      sort,
      searchText,
      filterParams: {
        ...filterParams,
        ...additionalFilterParams,
      },
    },
  });

  const columns = useMemo<TableProps<Document>["columns"]>(
    () => [
      {
        title: "",
        dataIndex: "icon",
        key: "icon",
        width: 50,
        render: (_, record) => getFileIcon(record),
      },
      {
        title: t("Name"),
        dataIndex: "name",
        key: "name",
        width: "40%",
        sorter: () => 0,
        render: (value) => (
          <div className="line-clamp-2" title={value}>
            {value}
          </div>
        ),
      },
      {
        title: t("Size"),
        dataIndex: "fileSize",
        key: "fileSize",
        width: 140,
        sorter: () => 0,
        render: (value, record) => (
          <div>{record.isFolder ? "-" : convertFileSize(value)}</div>
        ),
      },
      {
        title: t("Last modified"),
        dataIndex: "updatedOn",
        key: "updatedOn",
        width: 160,
        sorter: () => 0,
        render: (value) => (
          <div className="line-clamp-1">{dayjs(value).format(DATE_FORMAT)}</div>
        ),
      },
      {
        title: t("Tags"),
        dataIndex: "tags",
        key: "tags",
        render: (value) => (
          <div className="flex flex-wrap gap-1">
            {value.map((tag: LookupTag) => (
              <div className="tag_item" key={tag.id}>
                {tag.name}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "",
        key: "isSelected",
        dataIndex: "isSelected",
        width: 50,
        render: (val) => (
          <div className="cursor-pointer">
            <FaRegStar className={classNames({ "text-[#F2C94CFF]": val })} />
          </div>
        ),
      },
      {
        title: "",
        key: "view",
        fixed: "right",
        width: 50,
        render: (_, record) =>
          record.isFolder ? (
            <Button
              type="text"
              size="small"
              icon={<FaRegFolderOpen />}
              shape="circle"
              onClick={() => {
                navigate(`/documents/documents/folders/${record.id}`);
                selectFolderId(record.id);
                setCurrentPage(1);
                handleCloseAction();
              }}
            />
          ) : (
            <Button
              type="text"
              size="small"
              icon={<MdOutlineRemoveRedEye />}
              shape="circle"
            />
          ),
      },
      {
        title: "",
        key: "dots",
        dataIndex: "dots",
        fixed: "right",
        width: 50,
        render: (_, record) => (
          <DotsTableCell record={record} folderId={selectedFolderId} />
        ),
      },
    ],
    [isFetching],
  );

  return (
    <div className="content-page">
      <PageContentHeader filterComponent={<FilterComponent />} />
      <AdditionalFilterComponent />
      <FileUploader key={selectedFolderId} folderId={selectedFolderId}>
        <div className="table-page-wrapper">
          <Table
            rowSelection={rowSelection}
            loading={isLoading}
            rowKey="id"
            columns={columns}
            dataSource={documents || []}
            onChange={(_, __, sorter) => onTableChange(sorter)}
            pagination={{
              ...tablePaginationConfig,
              total: total,
            }}
            sticky={{ offsetHeader: TABLE_HEADER_OFFSET }}
            scroll={{ x: window.innerHeight }}
          />
        </div>
      </FileUploader>
    </div>
  );
};

export default DocumentPageComponent;
