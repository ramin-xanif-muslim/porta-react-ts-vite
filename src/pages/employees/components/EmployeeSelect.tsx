import { Select } from "antd";
import { t } from "i18next";

import { useEmployeeSelectOptionsWithInfinityScroll } from "../api/use-employee-select-options-with-infinity-scroll";

interface EmployeeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function EmployeeSelect({
  value,
  onChange,
  disabled,
}: EmployeeSelectProps) {
  const { options, loading, onSearch } =
    useEmployeeSelectOptionsWithInfinityScroll();

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={t("Select employee")}
      filterOption={false}
      showSearch
      onSearch={onSearch}
      options={options}
      loading={loading}
    />
  );
}
