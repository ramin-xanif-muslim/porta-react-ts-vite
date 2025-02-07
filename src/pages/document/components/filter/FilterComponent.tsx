import { Form, Select } from "antd";
import { useTagSelectOptions } from "../../../tags/api/useTagSelectOptions";
import { useListPageContext } from "../../../../HOC/withListPageContext";

export const FilterComponent = () => {
  const { onFilterChange, filterParams, setFilterParams } =
    useListPageContext();

  const { options: tagOptions, ...tagSelectOptions } = useTagSelectOptions();

  const handleChange = (values: Record<string, unknown>) => {
    setFilterParams(values);
    onFilterChange(values);
  };

  return (
    <Form
      onValuesChange={(_, values) => handleChange(values)}
      layout="horizontal"
      className="flex flex-col gap-2 sm:flex-row lg:gap-4"
    >
      <Form.Item name="tagIds" label="Tags" className="!mb-0">
        <Select
          defaultValue={filterParams.tags}
          className="!min-w-40"
          maxTagCount={1}
          options={[...tagOptions]}
          {...tagSelectOptions}
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item name="hasSecondVersion" label="Versions" className="!mb-0">
        <Select
          defaultValue={filterParams.versions}
          className="!min-w-40"
          allowClear
          options={[
            // {
            //   key: "1",
            //   label: "All",
            //   value: null,
            // },
            {
              key: "2",
              label: "Has Version",
              value: true,
            },
            {
              key: "3",
              label: "Has Not Version",
              value: false,
            },
          ]}
        />
      </Form.Item>
      {/* <Form.Item
        name="started"
        label="Started"
        valuePropName="checked"
        className="!mb-0"
      >
        <Checkbox defaultChecked={Boolean(filterParams.started)} />
      </Form.Item> */}
    </Form>
  );
};
