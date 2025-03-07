import { Form, FormInstance } from "antd";
import dayjs from "dayjs";

import { useListPageContext } from "../../HOC/withListPageContext";

interface Props {
  filters?: React.ReactNode[];
  form: FormInstance;
}

export const AdditionalPageFilters = ({ filters = [], form }: Props) => {
  const { visibleAdditionalFilters, setAdditionalFilterParams } =
    useListPageContext();

  const onFinish = (values: Record<string, unknown>) => {
    if (values.startDate)
      values.startDate = dayjs(values.startDate as Date).format("YYYY-MM-DD");
    if (values.endDate)
      values.endDate = dayjs(values.endDate as Date).format("YYYY-MM-DD");
    setAdditionalFilterParams(values);
  };

  return (
    <div>
      {visibleAdditionalFilters ? (
        <div className="w-full py-2">
          <Form
            form={form}
            name="filters"
            layout="vertical"
            className="flex flex-col gap-2 sm:flex-row lg:gap-4"
            onChange={() => {
              form.submit();
            }}
            onFinish={onFinish}
          >
            {filters.map((item) => item)}
          </Form>
        </div>
      ) : null}
    </div>
  );
};
