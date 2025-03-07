import { Form, Select } from "antd";

import { useListPageContext } from "../../../../HOC/withListPageContext";
import { useTagSelectOptions } from "../../../tags/api/useTagSelectOptions";

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
    </Form>
  );
};
