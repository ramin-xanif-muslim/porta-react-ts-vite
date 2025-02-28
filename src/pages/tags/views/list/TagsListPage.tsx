import { Table, TableProps } from "antd";
import { t } from "i18next";

import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import { Tag } from "../../types";
import { useGetTagsList } from "../../api";
import { useModalStore } from "../../../../store";
import { CreateBtn } from "../../../../components/ui/buttons";
import { DownloadBtn } from "../../../../components/ui/buttons";
import { PageContentHeader } from "../../../../components/page-content-header";
import DotsTableCell from "../../components/DotsTableCell";
import { TABLE_HEADER_OFFSET } from "../../../../constants";

const columns: TableProps<Tag>["columns"] = [
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "left",
    render: (_, record) => <DotsTableCell tag={record} />,
  },
  {
    title: t("Name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: t("Description"),
    dataIndex: "description",
    key: "description",
  },
];

function TagsListPageComponent() {
  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange, searchText } =
    useListPageContext<Tag>();

  const { tags, total, isLoading } = useGetTagsList({
    pageSize,
    currentPage,
    sort,
    searchText,
  });

  const { openModal } = useModalStore();

  return (
    <div className="page">
      <div className="header-page">
        <div className="header-page__actions">
          <DownloadBtn />
          <CreateBtn onClick={() => openModal("create-tag")}>
            {t("Add Tag")}
          </CreateBtn>
        </div>
      </div>
      <div className="content-page">
        <PageContentHeader />

        <div className="table-page-wrapper">
          <Table
            loading={isLoading}
            rowKey="id"
            columns={columns}
            dataSource={tags || []}
            onChange={(_, __, sorter) => onTableChange(sorter)}
            pagination={{
              ...tablePaginationConfig,
              total: total,
            }}
            sticky={{ offsetHeader: TABLE_HEADER_OFFSET }}
            scroll={{ x: window.innerHeight }}
          />
        </div>
      </div>
    </div>
  );
}

const TagsListPage = withListPageContext(TagsListPageComponent);

export { TagsListPage };
