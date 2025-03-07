import { useForm } from "antd/es/form/Form";

import { AdditionalPageFilters } from "../../../../components/filter/AdditionalPageFilters";
import CustomRangePicker from "../../../../components/form-items/CustomRangePicker";

export const AdditionalFilterComponent = () => {
  const [form] = useForm();

  return (
    <AdditionalPageFilters
      form={form}
      filters={[<CustomRangePicker form={form} />
      ]}
    />
  );
};
