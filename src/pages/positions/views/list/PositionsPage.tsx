import { Button, Table, TableProps } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";

import { Position } from "../../types";
import { useGetPositionsList } from "../../api";
import { useModalStore } from "../../../../store";
import DotsTableCell from "../../components/DotsTableCell";
import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";

const columns: TableProps<Position>["columns"] = [
  {
    title: t("Position Name"),
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "right",
    render: (_, record) => <DotsTableCell position={record} />,
  },
];

function PositionsPageComponent() {
  const {
    tablePaginationConfig,
    currentPage,
    pageSize,
    sort,
    onTableChange,
  } = useListPageContext<Position>();

  const { positions, total, isLoading } = useGetPositionsList({
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
            onClick={() => openModal("create-position")}
            size="large"
            type="primary"
            icon={<FiPlusCircle />}
          >
            {t("Add Position")}
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={positions || []}
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

const PositionsPage = withListPageContext(PositionsPageComponent);

export { PositionsPage };
