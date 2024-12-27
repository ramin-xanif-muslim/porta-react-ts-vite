import { Button, Table, TableProps } from "antd";
import { PiDownload } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { t } from "i18next";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Position } from "../../types";
import { useGetPositionsList } from "../../api";
import { useModalStore } from "../../../../store";
import DotsTableCell from "../../components/DotsTableCell";

const columns: TableProps<Position>["columns"] = [
  {
    title: t("Position Name"),
    dataIndex: "name",
    key: "name",
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

export function PositionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );
  const [pageSize, setPageSize] = useState(
    () => Number(searchParams.get("size")) || 10,
  );

  const { positions, total, isLoading } = useGetPositionsList({
    pageSize,
    currentPage,
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
          scroll={{ x: window.innerHeight }}
        />
      </div>
    </div>
  );
}

export default PositionsPage;
