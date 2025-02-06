import { Checkbox, Form, Select } from "antd";
import { useTagSelectOptions } from "../../../tags/api/useTagSelectOptions";
import { useListPageContext } from "../../../../HOC/withListPageContext";

export const FilterComponent = () => {
  const { onFilterChange, filterParams, setFilterParams } = useListPageContext();

  const { options: tagOptions, ...tagSelectOptions } = useTagSelectOptions();

  const handleChange = (values: Record<string, unknown>) => {
    setFilterParams(values);
    onFilterChange(values);
  };

  return (
    <Form
      onValuesChange={(_, values) => handleChange(values)}
      layout="horizontal"
      className="flex flex-col sm:flex-row gap-2 lg:gap-10"
    >
      <Form.Item name="tags" label="Tags">
        <Select
          defaultValue={filterParams.tags}
          className="!min-w-40  !max-w-40"
          maxTagCount={3}
          options={[...tagOptions]}
          {...tagSelectOptions}
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item name="versions" label="Versions">
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
              value: "hasVersion",
            },
            {
              key: "3",
              label: "Has Not Version",
              value: "hasNotVersion",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="started" label="Started" valuePropName="checked">
        <Checkbox defaultChecked={Boolean(filterParams.started)} />
      </Form.Item>
    </Form>
  );
};
