import { Checkbox, Form, Select } from "antd";
import { useTagSelectOptions } from "../../../tags/api/useTagSelectOptions";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useListPageContext } from "../../../../HOC/withListPageContext";

export const FilterComponent = () => {
  const { setFilterParams, onFilterChange } = useListPageContext();
  const [searchParams] = useSearchParams();

  const [formValues, setFormValues] = useState<Record<string, unknown>>(
    () => {
      const filter = searchParams.get("filter");
      return filter ? JSON.parse(filter) : {};
    },
  );

  const { options: tagOptions, ...tagSelectOptions } = useTagSelectOptions();

  const handleChange = (values: Record<string, unknown>) => {
    setFormValues(values);
    onFilterChange(values);
  };

  useEffect(() => {
    return () => {
      setFormValues({});
      setFilterParams({});
    };
  }, []);

  return (
    <Form
      onValuesChange={(_, values) => handleChange(values)}
      layout="horizontal"
      className="flex flex-col sm:flex-row items-center gap-2 lg:gap-10"
    >
      <Form.Item name="tags" label="Tags">
        <Select
          defaultValue={formValues.tags}
          className="!min-w-40"
          maxTagCount={1}
          options={[...tagOptions]}
          {...tagSelectOptions}
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item name="versions" label="Versions">
        <Select
          defaultValue={formValues.versions || "All"}
          className="!min-w-40"
          options={[
            {
              key: "1",
              label: "All",
              value: null,
            },
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
        <Checkbox defaultChecked={Boolean(formValues.started)} />
      </Form.Item>
    </Form>
  );
};
