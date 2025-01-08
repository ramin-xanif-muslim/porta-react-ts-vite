import { Table, TableProps } from "antd";
import { t } from "i18next";

import { Department } from "../../types";
import { useModalStore } from "../../../../store";
import DotsTableCell from "../../components/DotsTableCell";
import { useGetDepartmentsList } from "../../api/use-get-departments-list";
import {
  withListPageContext,
  useListPageContext,
} from "../../../../HOC/withListPageContext";
import { CreateBtn, DownloadBtn } from "../../../../components/ui/buttons";

const columns: TableProps<Department>["columns"] = [
  {
    title: t("Department Name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: t("Manager"),
    dataIndex: "managerFirstName",
    key: "managerFirstName",
    render: (_, record) =>
      `${record.managerFirstName} ${record.managerLastName}`,
  },
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "right",
    render: (_, record) => <DotsTableCell department={record} />,
  },
];

function DepartmentsPageComponent() {
  const {
    currentPage,
    pageSize,
    sort,
    onTableChange,
    tablePaginationConfig,
  } = useListPageContext<Department>();

  const { departments, total, isLoading } = useGetDepartmentsList({
    pageSize,
    currentPage,
    sort,
  });

  const { openModal } = useModalStore();

  return (
    <div className="list-page-container">
      <div className="list-page-header">
        <h1 className="list-page-title">{t("Departments")}</h1>
        <div className="list-page-actions-wrapper">
          <DownloadBtn />
          <CreateBtn onClick={() => openModal("create-department")}>
            {t("Add Department")}
          </CreateBtn>
        </div>
      </div>

      <div className="list-page-table-wrapper">
        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={departments || []}
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

const DepartmentsPage = withListPageContext(DepartmentsPageComponent);

export { DepartmentsPage };
