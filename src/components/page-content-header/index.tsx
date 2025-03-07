import { Dropdown } from "antd";
import { Button } from "antd";
import { IoMdSettings } from "react-icons/io";

import { FilterBtn } from "../filter/FilterBtn";

import { DataTableSearch } from "./DataTableSearch";

interface Props {
  filterComponent?: React.ReactNode;
}

export const PageContentHeader = ({ filterComponent }: Props) => {
  return (
    <div className="sticky left-0 right-0 top-0 z-50 flex flex-col gap-4 bg-white pb-1 pt-2 lg:flex-row">
      <div className="w-full md:w-2/3 lg:w-1/3">
        <DataTableSearch />
      </div>

      <div className="flex flex-1 lg:ml-6">
        {filterComponent}
        <div className="ml-auto flex gap-2">
          <FilterBtn />
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
            <Button icon={<IoMdSettings className="size-4" />} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
