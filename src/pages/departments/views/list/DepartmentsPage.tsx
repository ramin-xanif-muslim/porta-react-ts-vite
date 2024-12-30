import { Button, Table, TableProps } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";

import { Department } from "../../types";
import { useModalStore } from "../../../../store";
import DotsTableCell from "../../components/DotsTableCell";
import { useGetDepartmentsList } from "../../api/use-get-departments-list";
import {
  withListPageContext,
  useListPageContext,
} from "../../../../HOC/withListPageContext";

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
    onPaginationChange,
    currentPage,
    pageSize,
    sort,
    onTableChange,
  } = useListPageContext<Department>();

  const { departments, total, isLoading } = useGetDepartmentsList({
    pageSize,
    currentPage,
    sort,
  });

  const { openModal } = useModalStore();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button size="large" icon={<PiDownload />}>
            {t("Download")}
          </Button>
          <Button
            onClick={() => openModal("create-department")}
            size="large"
            type="primary"
            icon={<FiPlusCircle />}
          >
            {t("Add Department")}
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={departments || []}
          onChange={(_, __, sorter) => onTableChange(sorter)}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: onPaginationChange,
            showSizeChanger: true,
            showTotal: (total) =>
              t(`Show {{currentPage}} to {{pageSize}} of {{total}}`, {
                total,
                currentPage,
                pageSize,
              }),
          }}
          scroll={{ x: window.innerHeight }}
        />
      </div>
    </div>
  );
}

const DepartmentsPage = withListPageContext(DepartmentsPageComponent);

export { DepartmentsPage };
