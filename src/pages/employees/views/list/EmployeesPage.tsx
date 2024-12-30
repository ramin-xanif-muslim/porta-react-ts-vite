import { Button, Table, TableProps } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";
import { Link } from "react-router-dom";

import DotsTableCell from "../../components/DotsTableCell";
import { Employee } from "../../types";
import { useGetEmployeesList } from "../../api";
import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";

const columns: TableProps<Employee>["columns"] = [
  {
    title: t("Avatar"),
    dataIndex: "avatar",
    key: "avatar",
    width: 100,
    ellipsis: true,
    render: (value?: string) => (
      <img
        src={value || "/avatar.jpg"}
        alt="avatar"
        className="size-9 rounded-full"
      />
    ),
  },
  {
    title: t("Full Name"),
    dataIndex: "fullName",
    key: "fullName",
    render: (_: unknown, record: Employee) => (
      <span className="line-clamp-1">
        {record.firstName} {record.lastName}
      </span>
    ),
  },
  {
    title: t("Email"),
    dataIndex: "email",
    key: "email",
  },
  {
    title: t("Office Number"),
    dataIndex: "officeNumber",
    key: "officeNumber",
  },
  {
    title: t("Position"),
    dataIndex: "positionName",
    key: "positionName",
  },
  {
    title: t("Is Office"),
    dataIndex: "isOffice",
    key: "isOffice",
    sorter: true,
  },
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "right",
    render: (_, record) => <DotsTableCell employee={record} />,
  },
];

function EmployeesPageComponent() {
  const {
    tablePaginationConfig,
    currentPage,
    pageSize,
    sort,
    onTableChange,
  } = useListPageContext<Employee>();

  const { employees, total, isLoading } = useGetEmployeesList({
    pageSize,
    currentPage,
    sort,
  });

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button size="large" icon={<PiDownload />}>
            {t("Download")}
          </Button>
          <Link to="/employees/create">
            <Button size="large" type="primary" icon={<FiPlusCircle />}>
              {t("Add Employee")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={employees || []}
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

const EmployeesPage = withListPageContext(EmployeesPageComponent);

export { EmployeesPage };
