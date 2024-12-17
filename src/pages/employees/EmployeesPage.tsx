import { Button, Table } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetEmployeesList } from "./use-get-employees-list";
import { EmployeeDTO } from "../../types";
import { useState } from "react";

const columns = [
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
    render: (_: unknown, record: EmployeeDTO) => (
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
  },
];

const EmployeesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );
  const [pageSize, setPageSize] = useState(
    () => Number(searchParams.get("size")) || 10,
  );

  const { employees, total, isLoading } = useGetEmployeesList({
    pageSize,
    currentPage,
  });

  const navigate = useNavigate();

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
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows,
              );
            },
          }}
          columns={columns.map((i) => ({ ...i, title: i.title.toUpperCase() }))}
          dataSource={employees || []}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page, size) => {
              setSearchParams((prev) => {
                prev.set("page", page.toString());
                prev.set("size", size.toString());
                return prev;
              });
              setCurrentPage(page);
              setPageSize(size);
            },
            showSizeChanger: true,
            showTotal: (total) =>
              t(`Show {{currentPage}} to {{pageSize}} of {{total}}`, {
                total,
                currentPage,
                pageSize,
              }),
          }}
          // sticky
          scroll={{ x: window.innerHeight }}
          onRow={(record) => ({
            onClick: () => navigate(`/employees/${record.id}`),
          })}
        />
      </div>
    </div>
  );
};

export default EmployeesPage;
