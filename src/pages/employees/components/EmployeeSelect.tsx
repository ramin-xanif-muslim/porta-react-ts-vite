import { Select } from "antd";
import { useGetLookupEmployee } from "../api/use-get-lookup-employee";
import { t } from "i18next";
import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

interface EmployeeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const PAGE_SIZE = 100;

export function EmployeeSelect({
  value,
  onChange,
  disabled,
}: EmployeeSelectProps) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data: lookupEmployees, isFetching } = useGetLookupEmployee({
    take: PAGE_SIZE,
    filters: {
      searchText: debouncedSearchText,
    },
  });

  const options =
    lookupEmployees?.map((employee: { id: string; name: string }) => ({
      key: employee.id,
      value: employee.id,
      label: employee.name,
    })) ?? [];

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={t("Select employee")}
      onSearch={setSearchText}
      // filterOption={false}
      showSearch
      options={options}
      loading={isFetching}
    />
  );
}
