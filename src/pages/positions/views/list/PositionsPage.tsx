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
import { PageContentHeader } from "../../../../components/page-content-header";
import { TABLE_HEADER_OFFSET } from "../../../../constants";

const columns: TableProps<Position>["columns"] = [
  {
    title: "",
    key: "dots",
    dataIndex: "dots",
    width: 50,
    fixed: "left",
    render: (_, record) => <DotsTableCell position={record} />,
  },
  {
    title: t("Position Name"),
    dataIndex: "name",
    key: "name",
    sorter: true,
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
    <div className="page">
      <div className="header-page">
        <div className="header-page__actions">
          <DownloadBtn />
          <CreateBtn onClick={() => openModal("create-position")}>
            {t("Add Position")}
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
            dataSource={positions || []}
            onChange={(_, __, sorter) => onTableChange(sorter)}
            pagination={{
              ...tablePaginationConfig,
              total: total,
            }}
            sticky={{ offsetHeader: TABLE_HEADER_OFFSET }}
            scroll={{ x: window.innerHeight }}
          />
        </div>
      </div>
    </div>
  );
}

const PositionsPage = withListPageContext(PositionsPageComponent);

export { PositionsPage };
