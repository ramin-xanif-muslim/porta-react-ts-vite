import { Table, TableProps } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";

import DotsTableCell from "../../components/DotsTableCell";
import { Employee } from "../../types";
import { useGetEmployeesList } from "../../api";
import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import { CreateBtn, DownloadBtn } from "../../../../components/ui/buttons";
import { PageContentHeader } from "../../../../components/page-content-header";

const columns: TableProps<Employee>["columns"] = [
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "left",
    render: (_, record) => <DotsTableCell employee={record} />,
  },
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
];

function EmployeesPageComponent() {
  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange } =
    useListPageContext<Employee>();

  const { employees, total, isLoading } = useGetEmployeesList({
    pageSize,
    currentPage,
    sort,
  });

  return (
    <div className="page">
      <div className="header-page">
        <div className="header-page__actions">
          <DownloadBtn />
          <Link to="/employees/create">
            <CreateBtn>{t("Add Employee")}</CreateBtn>
          </Link>
        </div>
      </div>
      <div className="content-page">
        <PageContentHeader total={total} />

        <div className="table-page-wrapper">
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
    </div>
  );
}

const EmployeesPage = withListPageContext(EmployeesPageComponent);

export { EmployeesPage };
