import { Table, TableProps } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { User } from "../../types";
import { useGetUsersList } from "../../api";
import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import DotsTableCell from "../../components/DotsTableCell";
import { CreateBtn, DownloadBtn } from "../../../../components/ui/buttons";

const columns: TableProps<User>["columns"] = [
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
    title: t("Username"),
    dataIndex: "username",
    key: "username",
  },
  {
    title: t("Full Name"),
    dataIndex: "fullName",
    key: "fullName",
    render: (_: unknown, record: User) => (
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
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "right",
    render: (_, record) => <DotsTableCell user={record} />,
  },
];

function UsersListPageComponent() {
  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange } =
    useListPageContext<User>();

  const { users, total, isLoading } = useGetUsersList({
    pageSize,
    currentPage,
    sort,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex justify-between p-6">
        <h1 className="mb-6 text-2xl font-bold">{t("Users")}</h1>
        <div className="flex gap-2">
          <DownloadBtn />
          <Link to="/users/create">
            <CreateBtn>{t("Add User")}</CreateBtn>
          </Link>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Table
          className="rounded-lg bg-white shadow-sm"
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={users || []}
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

const UsersListPage = withListPageContext(UsersListPageComponent);

export { UsersListPage };
