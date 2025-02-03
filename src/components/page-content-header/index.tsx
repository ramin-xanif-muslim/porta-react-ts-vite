import { Dropdown, Form } from "antd";
import { Button } from "antd";
import { IoMdSettings } from "react-icons/io";
import { DataTableSearch } from "./DataTableSearch";

interface Props {
  filterComponent?: React.ReactNode;
}

export const PageContentHeader = ({
  filterComponent,
}: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full md:w-2/3 lg:w-1/3">
        <DataTableSearch />
      </div>

      <div className="flex-1 flex lg:ml-6">
          {filterComponent}
          <Form.Item className="ml-auto">
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
          </Form.Item>
      </div>
    </div>
  );
};
