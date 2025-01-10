import { Dropdown } from "antd";
import { Select } from "antd";
import { Button } from "antd";
import { t } from "i18next";
import { IoMdSettings } from "react-icons/io";
import { DataTableSearch } from "./DataTableSearch";

export const PageContentHeader = ({ total = 0 }: { total?: number }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="flex-1">
        <DataTableSearch />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 sm:justify-end">
          <span>
            {`${t("Showing")} (${total})`}
          </span>
          <Select defaultValue="all">
            <Select.Option value="all">All</Select.Option>
          </Select>
          <Select defaultValue="all">
            <Select.Option value="all">All</Select.Option>
          </Select>
          <Dropdown
            arrow={true}
            menu={{
              items: [
                {
                  key: "1",
                  label: "",
                },
              ],
            }}
          >
            <Button>
              <IoMdSettings className="size-4" />
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
