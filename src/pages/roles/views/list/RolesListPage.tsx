import { Button, Table, TableProps } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";

import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import { Role } from "../../types";
import { useGetRolesList } from "../../api";
import DotsTableCell from "../../components/DotsTableCell";
import { useModalStore } from "../../../../store";

const columns: TableProps<Role>["columns"] = [
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
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "right",
    render: (_, record) => <DotsTableCell role={record} />,
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
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex justify-between p-6">
        <h1 className="mb-6 text-2xl font-bold">{t("Roles")}</h1>
        <div className="flex gap-2">
          <Button size="large" icon={<PiDownload />}>
            {t("Download")}
          </Button>
          <Button
            onClick={() => openModal("create-role")}
            size="large"
            type="primary"
            icon={<FiPlusCircle />}
          >
            {t("Add Role")}
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Table
          className="rounded-lg bg-white shadow-sm"
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
  );
}

const RolesListPage = withListPageContext(RolesListPageComponent);

export { RolesListPage };
