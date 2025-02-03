import { Table, TableProps } from "antd";
import { t } from "i18next";

import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import { Role } from "../../types";
import { useGetRolesList } from "../../api";
import DotsTableCell from "../../components/DotsTableCell";
import { useModalStore } from "../../../../store";
import { CreateBtn } from "../../../../components/ui/buttons";
import { DownloadBtn } from "../../../../components/ui/buttons";
import { PageContentHeader } from "../../../../components/page-content-header";

const columns: TableProps<Role>["columns"] = [
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "left",
    render: (_, record) => <DotsTableCell role={record} />,
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

function RolesListPageComponent() {
  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange } =
    useListPageContext<Role>();

  const { roles, total, isLoading } = useGetRolesList({
    pageSize,
    currentPage,
    sort,
  });

  const { openModal } = useModalStore();

  return (
    <div className="page">
      <div className="header-page">
        <div className="header-page__actions">
          <DownloadBtn />
          <CreateBtn onClick={() => openModal("create-role")}>
            {t("Add Role")}
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
            dataSource={roles || []}
            onChange={(_, __, sorter) => onTableChange(sorter)}
            pagination={{
              ...tablePaginationConfig,
              total: total,
            }}
            scroll={{ x: window.innerHeight }}
          />
        </div>
      </div>
    </div>
  );
}

const RolesListPage = withListPageContext(RolesListPageComponent);

export { RolesListPage };
