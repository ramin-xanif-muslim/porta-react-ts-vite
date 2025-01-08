import { Table, TableProps } from "antd";
import { t } from "i18next";

import { Position } from "../../types";
import { useGetPositionsList } from "../../api";
import { useModalStore } from "../../../../store";
import DotsTableCell from "../../components/DotsTableCell";
import {
  useListPageContext,
  withListPageContext,
} from "../../../../HOC/withListPageContext";
import { CreateBtn, DownloadBtn } from "../../../../components/ui/buttons";

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
  const { tablePaginationConfig, currentPage, pageSize, sort, onTableChange } =
    useListPageContext<Position>();

  const { positions, total, isLoading } = useGetPositionsList({
    pageSize,
    currentPage,
    sort,
  });

  const { openModal } = useModalStore();

  return (
    <div className="list-page-container">
      <div className="list-page-header">
        <h1 className="list-page-title">{t("Positions")}</h1>
        <div className="list-page-actions-wrapper">
          <DownloadBtn />
          <CreateBtn onClick={() => openModal("create-position")}>
            {t("Add Position")}
          </CreateBtn>
        </div>
      </div>

      <div className="list-page-table-wrapper">
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
